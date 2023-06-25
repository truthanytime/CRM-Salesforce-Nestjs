import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { AccountRepository } from './repositories/account.repository';
import { AccountContactRepository } from './repositories/accountContact.repository';
import { TypeForAccountRepository } from './repositories/typeForAccount.repository';
import { StageForAccountRepository } from './repositories/stageForAccount.repository';
import { AccountStageRepository } from './repositories/accountStage.repository';
import { AccountTypeRepository } from './repositories/accountType.repository';
import { AccountContactInformationRepository } from './repositories/accountContactInformation.repository';
import { AccountContactInformationService } from './services/accountContactInformation.service';
import { AccountStageController } from './controllers/accountStage.controller';
import { AccountStageService } from './services/accountStage.service';
import { AccountTypeController } from './controllers/accountType.controller';
import { AccountTypeService } from './services/accountType.service';
import { AccountContactService } from './services/accountContact.service';
import { AccountContactController } from './controllers/accountContact.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      AccountContactRepository,
      TypeForAccountRepository,
      StageForAccountRepository,
      AccountStageRepository,
      AccountTypeRepository,
      AccountContactInformationRepository,
    ]),
  ],
  providers: [
    AccountService,
    AccountContactService,
    AccountContactInformationService,
    AccountStageService,
    AccountTypeService,
  ],
  controllers: [
    AccountController,
    AccountContactController,
    AccountStageController,
    AccountTypeController,
  ],
})
export class AccountModule {}
