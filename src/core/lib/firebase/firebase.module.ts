import envConfig from '@/config/env.config';
import env from '@/config/env.config';
import { getSecret } from '@/config/secret-manager.config';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseController } from './firebase.controller';
import {
  FIREBASE_PROVIDER_TOKEN,
  IFirebaseModuleOptions,
  IFirebaseOptions,
} from './types';

const firebaseProvider = {
  provide: FIREBASE_PROVIDER_TOKEN,
  useFactory: async (firebaseOptions: IFirebaseOptions) => {
    const firebaseSecretName = envConfig().firebaseSecretName;
    const serviceAccount = await getSecret(firebaseSecretName);
    initializeApp({
      credential: cert(serviceAccount),
    });
    const db = getFirestore().doc(firebaseOptions.firestoreBasePath);
    return { db };
  },
  inject: [{ token: 'FIREBASE_OPTIONS', optional: true }],
};

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: IFirebaseModuleOptions): DynamicModule {
    const firestoreBasePath = `${env().stage ?? 'development'}/${
      options.firestoreMainDoc
    }`;
    const firebaseOptions: IFirebaseOptions = {
      firestoreBasePath,
    };
    return {
      module: FirebaseModule,
      providers: [
        { provide: 'FIREBASE_OPTIONS', useValue: firebaseOptions },
        firebaseProvider,
      ],
      exports: [firebaseProvider],
      controllers: [FirebaseController],
    };
  }
}
