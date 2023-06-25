import { AccountResponseDto } from '../dto/account/account.response.dto';
import { Account } from '../entities/account.entity';

export const accountNormalizer = {
  getAccountResponseDto(account: Account): AccountResponseDto {
    return {
      accountId: account.accountId,
      accountName: account.accountName,
      description: account.description,
      company: account.company,
      webURL: account.webURL,
      industryId: account.industryId,
      accountTypeId: account.accountTypeId,
      accountStageId: account.accountStageId,
      accountStatus: account.accountStatus,
      foundedDate: account.foundedDate,
      employeesNumber: account.employeesNumber,
      revenuePerYear: account.revenuePerYear,
      childOf: account.childOf,
      createDate: account.createDate,
      updateDate: account.updateDate,
      createdBy: account.createdBy,
      tenantUserId: account.tenantUserId,
      tenantUser: account.tenantUser
        ? {
            userId: account.tenantUser.userId,
            userName: account.tenantUser.userName,
          }
        : undefined,
      contactInfo: account.contactInfo
        ? {
            accountContInfoId: account.contactInfo.accountContInfoId,
            addressState: account.contactInfo.addressState,
            city: account.contactInfo.city,
            country: account.contactInfo.country,
            email: account.contactInfo.email,
            mobileNumber: account.contactInfo.mobileNumber,
            phoneNumber: account.contactInfo.phoneNumber,
            street: account.contactInfo.street,
            zip: account.contactInfo.zip,
          }
        : undefined,
      contacts: account.contacts,
    };
  },
};
