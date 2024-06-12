export interface Credentials {
  email: string;
  password: string;
  displayName: string;
}

export type SignInCredentials = Omit<Credentials, 'displayName'>;
