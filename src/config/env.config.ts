import * as dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

export interface Environment {
  PORT: number;
  STAGE: string;
  COGNITO_USER_POOL_ID: string;
  COGNITO_CLIENT_ID: string;
  COGNITO_REGION: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDING_DOMAIN: string;
  FRONTEND_URL: string;
  DATABASE_URL: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_DEFAULT_REGION: string;
  SQS_DATA_SET_QUEUE_NAME: string;
  SQS_DATA_SET_QUEUE_URL: string;
  SQS_RULE_APPLIER_QUEUE_URL: string;
  SQS_DATA_SYNCHRONIZER_QUEUE_URL: string;
  SWAGGER_USERNAME: string;
  SWAGGER_PASSWORD: string;
  GOOGLE_API_CLIENT_ID: string;
  GOOGLE_API_CLIENT_SECRET: string;
  FIREBASE_SECRET_NAME: string;
  SALESFORCE_CONSUMER_KEY: string;
  SALESFORCE_CONSUMER_SECRET: string;
  INTEGRATION_SESSION_KMS_KEY_ID: string;
}

let fullEnv: Environment;

if (!process.env.STAGE || process.env.STAGE === 'development') {
  fullEnv = {
    ...(dotenv.config().parsed as unknown as Environment),
    ...process.env,
  };
} else {
  fullEnv = {
    ...(process.env as unknown as Environment),
  };
}

const env: Environment = cleanEnv(fullEnv, {
  PORT: port({
    default: 3000,
    desc: 'The TCP port that this server will listen to',
  }),
  STAGE: str({
    desc: 'The current stage of this application',
    example: 'development',
    devDefault: 'development',
  }),
  COGNITO_USER_POOL_ID: str({
    desc: 'AWS Cognito user pool id',
    example: 'us-east-1_ridkd...',
  }),
  COGNITO_CLIENT_ID: str({
    desc: 'AWS Cognito client id',
    example: '7cp4b241qcd3addjd...',
  }),
  COGNITO_REGION: str({
    desc: 'AWS Cognito region',
    example: 'us-east-1',
    devDefault: 'us-east-1',
  }),
  SENDGRID_API_KEY: str({
    desc: 'Sendgrid API key',
    example: '080ba91b60db42e8ade4137748dsadb1',
  }),
  SENDGRID_SENDING_DOMAIN: str({
    desc: 'Verified Domain Name on Sendgrid for outbound emails',
    example: 'customercity.com',
    default: 'customercity.com',
  }),
  FRONTEND_URL: str({
    desc: 'Front end URL to accept requests from',
    default: 'http://localhost:3000',
  }),
  DATABASE_URL: str({
    desc: 'Full URL to connect to database server.',
    example: 'postgresql://username:password@localhost:5432/database',
  }),
  AWS_ACCESS_KEY_ID: str({
    desc: 'AWS Access Key Id',
    example: 'AKIXXXXXXXXXXXXXXXXP',
    devDefault: 'AKIXXXXXXXXXXXXXXXXP',
  }),
  AWS_SECRET_ACCESS_KEY: str({
    desc: 'AWS Secret Access Key',
    example: 'SbEfTobxxxxxxxxxxxxxxxxxxxxxxxhu',
    devDefault: 'SbEfTobxxxxxxxxxxxxxxxxxxxxxxxhu',
  }),
  AWS_DEFAULT_REGION: str({
    desc: 'AWS default region',
    example: 'us-east-1',
    default: 'us-east-1',
  }),
  SWAGGER_USERNAME: str({
    desc: 'Swagger docs endpoint username',
    default: 'admin',
  }),
  SWAGGER_PASSWORD: str({
    desc: 'Swagger docs endpoint password',
    default: 'admin',
  }),
  GOOGLE_API_CLIENT_ID: str({
    desc: 'Google Api client ID',
  }),
  GOOGLE_API_CLIENT_SECRET: str({
    desc: 'Google Api client secret',
  }),
  FIREBASE_SECRET_NAME: str({
    desc: 'AWS Secret Manager - Secret Name For Firebase Service Account',
  }),
  SALESFORCE_CONSUMER_KEY: str({
    desc: 'Salesforce Connected app - consumer key',
  }),
  SALESFORCE_CONSUMER_SECRET: str({
    desc: 'Salesforce Connected app - consumer secret',
  }),
  SQS_DATA_SET_QUEUE_NAME: str({
    desc: 'SQS data set name for triggering the data set and migration process',
    devDefault: 'dev-aws-useast1-data-set-calculator-queue.fifo',
  }),
  SQS_DATA_SET_QUEUE_URL: str({
    desc: 'SQS data set url for triggering the data set and migration process',
    devDefault:
      'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-data-set-calculator-queue.fifo',
  }),
  SQS_RULE_APPLIER_QUEUE_URL: str({
    desc: 'SQS data set url for triggering the rule applier process',
    devDefault:
      'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-rule-applier-queue.fifo',
  }),
  SQS_DATA_SYNCHRONIZER_QUEUE_URL: str({
    desc: 'SQS data set url for triggering the data synchronizer process',
    devDefault:
      'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-data-synchronizer-queue.fifo',
  }),
  INTEGRATION_SESSION_KMS_KEY_ID: str({
    desc: 'KMS key id to encrypt integration session information',
  }),
});

export default () => {
  return {
    port: env.PORT,
    stage: env.STAGE,
    isProduction: env.STAGE === 'production',
    isStaging: env.STAGE === 'staging',
    isDevelopment: env.STAGE === 'development',
    cognitoUserPoolId: env.COGNITO_USER_POOL_ID,
    cognitoClientId: env.COGNITO_CLIENT_ID,
    cognitoRegion: env.COGNITO_REGION,
    cognitoAuthority: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`,
    sendgridApiKey: env.SENDGRID_API_KEY,
    sendgridSendingDomain: env.SENDGRID_SENDING_DOMAIN,
    frontEndUrl: env.FRONTEND_URL,
    databaseURL: env.DATABASE_URL,
    awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    awsDefaultRegion: env.AWS_DEFAULT_REGION,
    swaggerUsername: env.SWAGGER_USERNAME,
    swaggerPassword: env.SWAGGER_PASSWORD,
    googleApiClientId: env.GOOGLE_API_CLIENT_ID,
    googleApiClientSecret: env.GOOGLE_API_CLIENT_SECRET,
    firebaseSecretName: env.FIREBASE_SECRET_NAME,
    salesforceConsumerKey: env.SALESFORCE_CONSUMER_KEY,
    salesforceConsumerSecret: env.SALESFORCE_CONSUMER_SECRET,
    sqsDataSetQueueName: env.SQS_DATA_SET_QUEUE_NAME,
    sqsDataSetQueueUrl: env.SQS_DATA_SET_QUEUE_URL,
    sqsRuleApplierQueueUrl: env.SQS_RULE_APPLIER_QUEUE_URL,
    sqsDataSynchronizerQueueUrl: env.SQS_DATA_SYNCHRONIZER_QUEUE_URL,
    integrationSessionKmsKeyId: env.INTEGRATION_SESSION_KMS_KEY_ID,
  };
};
