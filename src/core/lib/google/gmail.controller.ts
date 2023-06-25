import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';

@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  async status(@AuthedUser() authedUser: IAuthedUser) {
    const result = await this.gmailService.getStatus(authedUser.userId);
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('account')
  async getAuthenticatedEmail(@AuthedUser() authedUser: IAuthedUser) {
    const result = await this.gmailService.getAccount(authedUser.userId);
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('label')
  async createLabel(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: { labelName: string },
  ) {
    const result = await this.gmailService.createLabel(
      authedUser.userId,
      body.labelName,
    );
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('watch')
  async watch(@AuthedUser() authedUser: IAuthedUser) {
    const result = await this.gmailService.watchInbox(authedUser.userId);
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('threads')
  async list(@AuthedUser() authedUser: IAuthedUser) {
    const result = await this.gmailService.threads(authedUser.userId);
    return new SuccessResponseObject('success', result);
  }
}
