export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  isPremium?: boolean;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserForgotPassword {
  email: string;
}
