import { Injectable, NotFoundException } from '@nestjs/common';
import { FindConditions, FindOneOptions, Not } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';
import { AuthService } from '@/auth/auth.service';
import { MailService } from '@/mail/mail.service';
import env from '@/config/env.config';
import { cleanObject } from '@/common/utils';
import isEmpty from 'lodash.isempty';
import { UserRepository } from '../repositories/user.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { v4 } from 'uuid';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { userNormalizer } from '../normalizers/user.normalizer';
import { UserContactInformationService } from './userContactInformation.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly userContactInfoService: UserContactInformationService,
    private readonly mailService: MailService,
  ) {}

  @Transactional()
  async create(
    data: CreateUserRequestDto,
    creatorId?: number,
  ): Promise<CreateUserResponseDto> {
    const {
      userName,
      userEmail,
      userType,
      phoneNumber,
      mobileNumber,
      profileJobRole,
    } = data;

    let tenantId: number | undefined;

    if (creatorId) {
      const creator = await this.findOne({ userId: creatorId });
      tenantId = creator.tenantId;
    }

    const user = this.userRepository.create({
      userName,
      userEmail,
      userType,
      tenantId,
      userCreatedBy: creatorId,
      userCognitoId: v4(), // temporal
    });

    const savedUser = await this.userRepository.save(user);

    await this.userContactInfoService.create({
      userId: savedUser.userId,
      phoneNumber,
      mobileNumber,
      // profileJobRole,
    });

    const cognitoUser = await this.authService.createUser(userEmail, userType);

    // update with actual cognito user id
    await this.userRepository.save({
      ...savedUser,
      userCognitoId: cognitoUser.id,
    });

    await this.mailService.sendWelcomeEmail(userEmail, {
      password: cognitoUser.password,
      dashboardUrl: `${env().frontEndUrl}/auth/login?email=${encodeURIComponent(
        userEmail,
      )}`,
    });

    return userNormalizer.getCreateUserResponseDto(savedUser);
  }

  async findOne(
    where: FindConditions<User>,
    ownerId?: number,
  ): Promise<UserResponseDto> {
    const findOptions: FindOneOptions<User> = {
      where,
      relations: ['contactInfo'],
    };

    // if (ownerId) {
    //   findOptions.relations = ['company', 'profile'];
    //   findOptions.where = {
    //     ...where,
    //     company: { ownerId },
    //   };
    // }

    const user = await this.userRepository.findOne(undefined, findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return userNormalizer.getUserResponseDto(user);
  }

  async findAll(tenantId: number): Promise<UserResponseDto[]> {
    const userListResponse: UserResponseDto[] = await this.userRepository.find({
      where: { tenantId },
      relations: ['contactInfo'],
    });
    return userListResponse.map(userNormalizer.getUserResponseDto);
  }

  @Transactional()
  async update(
    id: number,
    data: UpdateUserRequestDto & { companyId?: number },
    ownerId?: number,
  ): Promise<void> {
    const findOptions: FindOneOptions<User> = {
      where: { userId: id },
      relations: ['contactInfo'],
    };

    if (ownerId) {
      // findOptions.relations = ['tenant', 'contactInfo'];
      // findOptions.where = {
      //   userId: id,
      //   company: { ownerId },
      // };
    }

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { userName, userEmail, userType, tenantId, ...profileData } = data;

    if (userEmail) {
      await this.authService.updateUser(user.userCognitoId, userEmail);
    }

    if (userType && userType !== user.userType) {
      await this.authService.updateUserGroup(
        user.userCognitoId,
        user.userType,
        userType,
      );
    }

    const userUpdate: Partial<User> = {
      userName,
      userEmail,
      userType,
      tenantId,
    };

    if (!isEmpty(userUpdate)) {
      await this.userRepository.save({
        ...user,
        ...cleanObject({
          ...userUpdate,
          userModifiedBy: ownerId,
        }),
      });
    }

    if (!isEmpty(profileData)) {
      await this.userContactInfoService.update(
        user.contactInfo.userContInfoId,
        profileData,
      );
    }
  }

  @Transactional()
  async delete(id: number, ownerId?: number): Promise<void> {
    const findOptions: FindOneOptions<User> = { where: { userId: id } };

    if (ownerId) {
      findOptions.relations = ['company'];
      findOptions.where = {
        userId: id,
        company: { ownerId },
      };
    }

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.remove([user]);

    await this.authService.deleteUser(user.userCognitoId);
  }

  async inactivate(
    id: number,
    userId: number,
    companyId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id, {
      where: { companyId, userId: Not(userId) },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.authService.disableUser(user.userCognitoId);

    await this.userRepository.save({ ...user, userActive: false });
  }

  async reactivate(
    id: number,
    userId: number,
    companyId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id, {
      where: { companyId, userId: Not(userId) },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.authService.enableUser(user.userCognitoId);

    await this.userRepository.save({ ...user, userActive: true });
  }
}
