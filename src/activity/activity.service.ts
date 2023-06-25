import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { ActivityResponseDto } from './dto/activity.response.dto';
import { UpdateActivityRequestDto } from './dto/update-activity.request.dto';
import { ActivityRepository } from './repositories/activity.repository';
import { EmailActivityDetailRepository } from './repositories/emailActivityDetail.repository';
import { ACTIVITY_TYPE_ID, EMAIL_TYPE_ID } from './types';
import { GmailService } from '@/core/lib/google/gmail.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly emailDetailRepository: EmailActivityDetailRepository,
    private readonly gmailService: GmailService,
  ) {}

  async create(
    data: CreateActivityRequestDto,
    userId: number,
  ): Promise<ActivityResponseDto> {
    const { emailActivityDetail, ...newActivity } = data;
    let emailThreadId: string, emailMessageId: string;
    // SEND EMAIL
    if (newActivity.activityTypeId === ACTIVITY_TYPE_ID.EMAIL) {
      const email = await this.gmailService.sendEmail(userId, {
        from: emailActivityDetail.emailFrom,
        to: emailActivityDetail.emailTo,
        subject: emailActivityDetail.emailSubject,
        html: emailActivityDetail.emailBody,
      });
      emailThreadId = email?.threadId;
      emailMessageId = email?.id;
    }

    // CREATE ACTIVITY
    const activity = this.activityRepository.create({
      ...newActivity,
      emailActivityThreadId: emailThreadId,
      tenantUserId: userId,
    });
    const savedActivity = await this.activityRepository.save(activity);

    if (newActivity.activityTypeId === ACTIVITY_TYPE_ID.EMAIL) {
      await this.emailDetailRepository.insert({
        ...emailActivityDetail,
        emailMessageId: emailMessageId,
        activityId: savedActivity.activityId,
      });
    }

    return savedActivity;
  }

  async findOne(id: number, userId: number): Promise<ActivityResponseDto> {
    const activity = await this.activityRepository.findOne(id, {
      where: {
        tenantUserId: userId,
        relations: ['emailActivityDetails', 'emailActivityDetails.emailType'],
      },
    });
    if (!activity) {
      throw new NotFoundException('Activity not found!');
    }
    return activity;
  }

  async update(
    id: number,
    data: UpdateActivityRequestDto,
    ownerId: number,
  ): Promise<ActivityResponseDto> {
    const activity = await this.findOne(id, ownerId);

    if (!activity) {
      throw new NotFoundException('Activity not found!');
    }

    const savedActivity = await this.activityRepository.save({
      ...activity,
      ...data,
    });

    return savedActivity;
  }

  async syncGmail(userId: number) {
    const gmailThreads = await this.gmailService.threads(userId);
    if (!gmailThreads) return;
    const processSync = gmailThreads?.map(async (thread) => {
      const threadId = thread.id;
      const messages = thread.messages;
      const activity = await this.activityRepository.findOne({
        where: { emailActivityThreadId: threadId },
      });

      if (activity) {
        const emailDetails = messages.map((message) => {
          return this.emailDetailRepository.create({
            activityId: activity.activityId,
            emailMessageId: message.id,
            emailFrom: message.payload.headers.find(
              (header) => header.name === 'From',
            )?.value,
            emailTo: message.payload.headers.find(
              (header) => header.name === 'To',
            )?.value,
            emailSubject: message.payload.headers.find(
              (header) => header.name === 'Subject',
            )?.value,
            emailBody: message.snippet,
            emailDate: new Date(),
            emailTypeId: message.payload.headers.find(
              (header) => header.name === 'Delivered-To',
            )?.value
              ? EMAIL_TYPE_ID.INCOMING
              : EMAIL_TYPE_ID.OUTGOING,
          });
        });
        await this.emailDetailRepository.upsert(emailDetails, {
          conflictPaths: ['emailMessageId'],
          skipUpdateIfNoValuesChanged: true,
        });
      }
    });

    await Promise.all(processSync);
  }

  async findAll(
    userId: number,
    contactId?: number,
  ): Promise<ActivityResponseDto[]> {
    await this.syncGmail(userId);

    const where = { tenantUserId: userId };
    if (contactId) {
      where['contactId'] = contactId;
    }
    const activityResponse: ActivityResponseDto[] =
      await this.activityRepository.find({
        where,
        order: { startDate: 'DESC' },
        relations: ['emailActivityDetails', 'emailActivityDetails.emailType'],
      });
    return activityResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const activity = await this.activityRepository.findOne(id, {
      where: { tenantUserId: ownerId },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found!');
    }

    await this.activityRepository.remove([activity]);
  }
}
