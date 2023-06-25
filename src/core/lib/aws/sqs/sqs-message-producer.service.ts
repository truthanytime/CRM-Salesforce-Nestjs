import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import env from '@/config/env.config';
import { DataSetMigrationSQSMessageDto } from './dto/data-set-migration-sqs-message.dto';
import { RuleApplierSqsMessageDto } from './dto/rule-applier-sqs-message.dto';
import { DataSynchronizerSqsMessageDto } from './dto/data-synchronizer-sqs-message.dto';

@Injectable()
export class SQSMessageProducerService {
  sqs: SQS;

  constructor() {
    this.sqs = new SQS();
  }

  async sendDataSetQueueMessage(body: DataSetMigrationSQSMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: 'DATA_SET_POST',
      QueueUrl: env().sqsDataSetQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async sendRuleApplierQueueMessage(body: RuleApplierSqsMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: 'RULE_APPLIER',
      QueueUrl: env().sqsRuleApplierQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async sendDataSynchronizerQueueMessage(body: DataSynchronizerSqsMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: 'DATA_SYNCHRONIZER',
      QueueUrl: env().sqsDataSynchronizerQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }
}
