import { GoogleModule } from '@/core/lib/google/google.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './repositories/activity.repository';
import { ActivityTypeRepository } from './repositories/activityType.repository';
import { CallActivityDetailRepository } from './repositories/callActivityDetail.repository';
import { EmailActivityDetailRepository } from './repositories/emailActivityDetail.repository';
import { EmailTypeRepository } from './repositories/emailType.repository';
import { IncomingEmailRecipientRepository } from './repositories/incomingEmailRecipient.repository';
import { MeetingActivityDetailRepository } from './repositories/meetingActivityDetail.repository';
import { MeetingAttendeeRepository } from './repositories/meetingAttendee.repository';
import { OutgoingEmailRecipientRepository } from './repositories/outgoingEmailRecipient.repository';
import { PostActivityDetailRepository } from './repositories/PostActivityDetail.repository';
import { SalePhaseRepository } from './repositories/salePhase.repository';
import { SmsActivityDetailRepository } from './repositories/smsActivityDetail.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityRepository,
      MeetingActivityDetailRepository,
      SmsActivityDetailRepository,
      MeetingAttendeeRepository,
      PostActivityDetailRepository,
      CallActivityDetailRepository,
      EmailActivityDetailRepository,
      ActivityTypeRepository,
      SalePhaseRepository,
      EmailTypeRepository,
      EmailActivityDetailRepository,
      OutgoingEmailRecipientRepository,
      IncomingEmailRecipientRepository,
    ]),
    GoogleModule,
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
