import { Controller, Get, Inject } from '@nestjs/common';
import { integrationApps } from './seeds';
import { IFirebaseProvider } from './types';

@Controller('firebase')
export class FirebaseController {
  constructor(
    @Inject('FIREBASE_PROVIDER_TOKEN')
    private readonly firebase: IFirebaseProvider,
  ) {}

  @Get('/seeds/integrationApps')
  async index() {
    // const process = integrationApps.map(async (app) => {
    //   await this.firebase.db
    //     .collection('integration-apps')
    //     .doc(app.integrationId)
    //     .set(app);
    //   return 'success';
    // });
    // return Promise.all(process);
  }
}
