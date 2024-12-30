import { User, UserCreate, UserForgotPassword, UserSignIn } from "../models";

export interface UserRepository {
  signUp(userData: UserCreate): Promise<User>;
  signIn(signInData: UserSignIn): Promise<User>;
  googleSignIn(): Promise<User>;
  passwordReset(userForgotPassword: UserForgotPassword): Promise<void>;
}
