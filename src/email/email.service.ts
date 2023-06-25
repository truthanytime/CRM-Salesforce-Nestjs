import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailRequestDto } from './dto/create-email.request.dto';
import { EmailResponseDto } from './dto/email.response.dto';
import { EmailRepository } from './email.repository';
import { FindOneOptions } from 'typeorm';
import { Email } from './email.entity';
import { GmailService } from '@/core/lib/google/gmail.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailRepository: EmailRepository,
    private readonly gmailService: GmailService,
  ) {}

  async create(
    data: CreateEmailRequestDto,
    ownerId: number,
  ): Promise<EmailResponseDto> {
    const email = this.emailRepository.create(data);
    try {
      await this.gmailService.sendEmail(ownerId, {
        from: email.emailFrom,
        to: email.emailTo,
        subject: email.emailSubject,
        html: email.emailContent,
      });
      const savedEmail = await this.emailRepository.save(email);
      return savedEmail;
    } catch (err) {
      console.log('ERROR SENDING EMAIL', err);
      throw new HttpException('error send email', 500);
    }
  }

  async findOne(id: number): Promise<EmailResponseDto> {
    const findOptions: FindOneOptions<Email> = {
      where: { emailId: id },
      relations: ['emailModifier', 'emailOwner', 'emailAccount'],
    };
    const email = await this.emailRepository.findOne(undefined, findOptions);
    if (!email) {
      throw new NotFoundException('Email not found!');
    }
    return email;
  }

  async findAll(): Promise<EmailResponseDto[]> {
    const emailResponse: EmailResponseDto[] = await this.emailRepository.find();
    return emailResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const email = await this.emailRepository.findOne(id);

    if (!email) {
      throw new NotFoundException('Email not found!');
    }

    await this.emailRepository.remove([email]);
  }

  getGmailAccount(ownerId: number) {
    return this.gmailService.getAccount(ownerId);
  }
}
