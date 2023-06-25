import { Injectable } from '@nestjs/common';
import env from '@/config/env.config';
import { KMS } from 'aws-sdk';

@Injectable()
export class KmsManagerService {
  kms: KMS;

  constructor() {
    this.kms = new KMS({
      accessKeyId: env().awsAccessKeyId,
      secretAccessKey: env().awsSecretAccessKey,
      region: env().awsDefaultRegion,
    });
  }

  async encrypt(keyId, source): Promise<string> {
    const params: KMS.EncryptRequest = {
      KeyId: keyId,
      Plaintext: source,
    };
    const { CiphertextBlob } = await this.kms.encrypt(params).promise();
    return CiphertextBlob.toString('base64');
  }

  async decrypt(source): Promise<string> {
    const params: KMS.DecryptRequest = {
      CiphertextBlob: Buffer.from(source, 'base64'),
    };
    const { Plaintext } = await this.kms.decrypt(params).promise();
    return Plaintext.toString();
  }
}
