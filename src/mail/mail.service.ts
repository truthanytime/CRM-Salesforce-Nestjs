import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import env from '@/config/env.config';
import {
  SendMailData,
  WelcomeTemplateData,
  PasswordResetTemplateData,
} from './types';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(env().sendgridApiKey);
  }

  async sendEmail<T>(mailData: SendMailData<T>): Promise<void> {
    await sgMail.send({
      ...mailData,
      from: mailData.from
        ? `<${mailData.from}>`
        : `<hello@${env().sendgridSendingDomain}>`,
    });
  }

  async sendWelcomeEmail(
    to: string,
    data: WelcomeTemplateData,
    from?: string,
  ): Promise<void> {
    await this.sendEmail<WelcomeTemplateData>({
      to,
      from,
      templateId: 'd-a506f06454614faab4fb1ebde6060af9',
      dynamicTemplateData: data,
    });
  }

  async sendPasswordResetEmail(
    to: string,
    data: PasswordResetTemplateData,
    from?: string,
  ): Promise<void> {
    await this.sendEmail<PasswordResetTemplateData>({
      to,
      from,
      templateId: 'd-9770504226ca4f4ca886634de7c43e13',
      dynamicTemplateData: data,
    });
  }
}
