import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { ContactRepository } from './repositories/contact.repository';
import { ContactStatusRepository } from './repositories/contactStatus.repository';
import { ContactSourceRepository } from './repositories/contactSource.repository';
import { ContactStageRepository } from './repositories/contactStage.repository';
import { SourceForContactRepository } from './repositories/sourceForcontact.repository';
import { JobRoleForContactRepository } from './repositories/jobRoleForContact.repository';
import { ContactContactInformationRepository } from './repositories/contactContactInformation.repository';
import { WorkDepartmentRepository } from './repositories/workDepartment.repository';
import { ContactSocialMediaRepository } from './repositories/contactSocialMedia.repository';
import { ContactContactInformationService } from './services/contactContactInformation.service';
import { ContactStageController } from './controllers/contactStage.controller';
import { ContactStageService } from './services/contactStage.service';
import { ContactSourceService } from './services/contactSource.service';
import { ContactStatusService } from './services/contactStatus.service';
import { ContactSourceController } from './controllers/contactSource.controller';
import { ContactStatusController } from './controllers/contactStatus.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactRepository,
      ContactStatusRepository,
      ContactSourceRepository,
      ContactStageRepository,
      SourceForContactRepository,
      JobRoleForContactRepository,
      ContactContactInformationRepository,
      WorkDepartmentRepository,
      ContactSocialMediaRepository,
    ]),
  ],
  providers: [
    ContactService,
    ContactContactInformationService,
    ContactStageService,
    ContactSourceService,
    ContactStatusService,
  ],
  controllers: [
    ContactController,
    ContactStageController,
    ContactSourceController,
    ContactStatusController,
  ],
})
export class ContactModule {}
