import { ContactResponseDto } from '../dto/contact/contact.response.dto';
import { Contact } from '../entities/contact.entity';

export const contactNormalizer = {
  getContactResponseDto(contact: Contact): ContactResponseDto {
    return {
      contactId: contact.contactId,
      ssid: contact.ssid,
      firstName: contact.firstName,
      middleName: contact.middleName,
      lastName: contact.lastName,
      title: contact.title,
      image: contact.image,
      contactSourceId: contact.contactSourceId,
      contactStatusId: contact.contactStatusId,
      contactStageId: contact.contactStageId,
      contactType: contact.contactType,
      createDate: contact.createDate,
      accountId: contact.accountId,
      updateDate: contact.updateDate,
      workDepartmentId: contact.workDepartmentId,
      reportsTo: contact.reportsTo,
      createdBy: contact.createdBy,
      tenantUserId: contact.tenantUserId,
      tenantUser: contact.tenantUser
        ? {
            userId: contact.tenantUser.userId,
            userName: contact.tenantUser.userName,
            tenantId: contact.tenantUser.tenantId,
          }
        : undefined,
      contactInfo: contact.contactInfo
        ? {
            contactContInfoId: contact.contactInfo.contactContInfoId,
            addressState: contact.contactInfo.addressState,
            city: contact.contactInfo.city,
            country: contact.contactInfo.country,
            email: contact.contactInfo.email,
            mobileNumber: contact.contactInfo.mobileNumber,
            phoneNumber: contact.contactInfo.phoneNumber,
            street: contact.contactInfo.street,
            zip: contact.contactInfo.zip,
          }
        : undefined,
      account: contact.account
        ? {
            accountId: contact.account.accountId,
            accountName: contact.account.accountName,
            description: contact.account.description,
            company: contact.account.company,
            webURL: contact.account.webURL,
          }
        : undefined,
    };
  },
};
