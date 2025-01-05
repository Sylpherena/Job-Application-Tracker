import { User, UserCreate, UserForgotPassword, UserSignIn } from "../models";
import { User as FirebaseUser } from "firebase/auth";

export interface UserRepository {
  signUp(userData: UserCreate): Promise<string>;
  signIn(signInData: UserSignIn): Promise<FirebaseUser>;
  googleSignIn(): Promise<FirebaseUser>;
  passwordReset(userForgotPassword: UserForgotPassword): Promise<void>;
  signOut(): Promise<void>;
  getUserDetails(user: FirebaseUser | null): Promise<User | null>;
}
