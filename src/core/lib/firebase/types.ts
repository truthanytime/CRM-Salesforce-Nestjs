export const FIREBASE_PROVIDER_TOKEN = 'FIREBASE_PROVIDER_TOKEN';

export interface IFirebaseModuleOptions {
  firestoreMainDoc: string;
}

export interface IFirebaseOptions {
  firestoreBasePath: string;
}

export interface IFirebaseProvider {
  db: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
}
