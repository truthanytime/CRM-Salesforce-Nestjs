import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer';
import { AttachmentLike } from 'nodemailer/lib/mailer';
import { Readable } from 'stream';
import { GoogleAuthService } from './google-auth.service';

interface IEmailOptions {
  to: string;
  from: string;
  subject: string;
  text?: string | Buffer | Readable | AttachmentLike;
  html?: string | Buffer | Readable | AttachmentLike;
}

@Injectable()
export class GmailService {
  constructor(private authService: GoogleAuthService) {}

  private async getAuthClient(ownerId: number) {
    return await this.authService.getAuth(ownerId);
  }

  private getAuthUserId(): string {
    return 'me';
  }

  private async getGmailApi(ownerId: number) {
    const auth = await this.getAuthClient(ownerId);
    if (!!auth) {
      const gmail = google.gmail({ version: 'v1', auth });
      return gmail;
    }
  }

  private encodeMessage(message: Buffer) {
    return Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private async createMessage(options: IEmailOptions) {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return this.encodeMessage(message);
  }

  async getAccount(ownerId: number) {
    const session = await this.authService.getUserSession(ownerId);
    return session?.email;
  }

  async getStatus(ownerId: number) {
    const session = await this.authService.getUserSession(ownerId);
    return !!session;
  }

  async sendEmail(ownerId: number, options: IEmailOptions) {
    const gmailApi = await this.getGmailApi(ownerId);
    if (!!gmailApi) {
      const rawMessage = await this.createMessage(options);
      const customerCityLabel = await this.getOrCreateCustomerCityLabel(
        ownerId,
      );
      const result = await gmailApi.users.messages.send({
        userId: this.getAuthUserId(),
        requestBody: {
          raw: rawMessage,
        },
      });
      const { id, threadId, labelIds } = result.data;
      const labelResult = await gmailApi.users.messages.modify({
        id,
        userId: 'me',
        requestBody: {
          addLabelIds: [customerCityLabel],
        },
      });
      console.log('SEND EMAIL RESULT:', id, threadId, labelIds);
      console.log('SET LABEL EMAIL RESULT:', labelResult.data);

      return result.data;
    }
  }

  async createLabel(ownerId: number, labelName: string) {
    /*
     * call this to create custom label to easily filter email by its label when call gmail api list/history
     */
    console.log('==== CREATE EMAIL LABEL ===', labelName);
    const gmailApi = await this.getGmailApi(ownerId);
    if (!gmailApi) return;
    const res = await gmailApi.users.labels.create({
      userId: 'me',
      requestBody: {
        name: labelName,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });
    return res.data;
  }

  async getOrCreateCustomerCityLabel(ownerId: number, labelName?: string) {
    /*
     * see createLabel
     * TODO: better create custom label on gmail integration flow,
     * so we don't need to check existance of label for each gmail api call later
     */
    const newLabelName = labelName || 'CustomerCity';
    const gmailApi = await this.getGmailApi(ownerId);
    if (!gmailApi) return;
    const res = await gmailApi.users.labels.list({
      userId: 'me',
    });
    const {
      data: { labels },
    } = res;
    let label = labels?.find((label) => label.name === newLabelName);
    console.log('==== EMAIL LABEL ===', labels, label);
    if (!label) {
      const res = await this.createLabel(ownerId, newLabelName);
      label = res;
    }
    return label.id;
  }

  async watchInbox(ownerId?: number) {
    /*
     * call this to watch user gmail inbox asynchronously
     * all updates will be posted to  push endpoint which configured in the google PubSub topic specified below
     */
    const gmailApi = await this.getGmailApi(ownerId);
    if (!gmailApi) return;
    const customerCityLabel = await this.getOrCreateCustomerCityLabel(ownerId);
    await gmailApi.users.stop({
      userId: 'me',
    });
    const result = await gmailApi.users.watch({
      userId: 'me',
      requestBody: {
        labelIds: [customerCityLabel], //TODO: handle label id
        topicName: 'projects/essential-text-356818/topics/GmailNotif',
        labelFilterAction: 'include',
      },
    });
    return result.data;
  }

  async threads(ownerId: number) {
    const gmailApi = await this.getGmailApi(ownerId);
    if (!gmailApi) return;
    const customerCityLabel = await this.getOrCreateCustomerCityLabel(ownerId);
    const threads = await gmailApi.users.threads.list({
      // Include messages from `SPAM` and `TRASH` in the results.
      includeSpamTrash: true,

      // Only return messages with labels that match all of the specified label IDs.
      labelIds: [customerCityLabel],

      // Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500.
      // maxResults: 100,

      // Page token to retrieve a specific page of results in the list.
      // pageToken: '',

      // Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope.
      // q: '',

      userId: 'me',
    });
    console.log('==== THREADS ====', threads);
    const getMessages = threads?.data?.threads?.map(async (thread) => {
      return await gmailApi.users.threads
        .get({
          userId: 'me',
          id: thread.id,
        })
        .then((resp) => resp.data);
    });
    const result = getMessages ? await Promise.all(getMessages) : [];
    return result?.flat();
  }
}
