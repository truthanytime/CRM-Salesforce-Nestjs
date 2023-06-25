import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { SQSMessageProducerService } from './sqs-message-producer.service';
import env from '@/config/env.config';

AWS.config.update({
  region: env().awsDefaultRegion,
  accessKeyId: env().awsAccessKeyId,
  secretAccessKey: env().awsSecretAccessKey,
});

@Module({
  providers: [SQSMessageProducerService],
  exports: [SQSMessageProducerService],
})
export class SqsModule {}
