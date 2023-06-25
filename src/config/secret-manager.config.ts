import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import envConfig from './env.config';

export const getSecret = async (secretName: string) => {
  if (!secretName) return;
  let secret: string;
  const region = envConfig().cognitoRegion;
  const client = new SecretsManagerClient({
    region: region,
    credentials: {
      accessKeyId: envConfig().awsAccessKeyId,
      secretAccessKey: envConfig().awsSecretAccessKey,
    },
  });

  const command = new GetSecretValueCommand({
    SecretId: secretName,
  });

  try {
    const data = await client.send(command);
    if ('SecretString' in data) {
      secret = data.SecretString;
    } else {
      throw new Error(`Cannot read secret ${secretName}`);
    }
  } catch (err) {
    throw err;
  }
  return JSON.parse(secret);
};
