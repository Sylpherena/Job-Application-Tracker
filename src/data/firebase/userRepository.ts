import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  User,
  UserCreate,
  UserForgotPassword,
  UserSignIn,
} from "../../domain/models";
import { UserRepository } from "../../domain/repository";
import { auth, db, googleProvider } from "./firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

export const firebaseUserRepo: UserRepository = {
  signUp: async function (userData: UserCreate): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Signed in
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.name,
      });

      const userDataReturn: User = {
        email: userData.email,
        name: userData.name,
        emailVerified: user.emailVerified,
      };

      await sendEmailVerification(user);

      return userDataReturn;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  signIn: async function (signInData: UserSignIn): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );

      // Signed in
      const user = userCredential.user;

      // Reference to the user's document in Firestore and fetch the user's additional data
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      const userPremiumData = userDoc.data()?.isPremium ?? false;

      return {
        isPremium: userPremiumData,
        name: user.displayName!,
        email: user.email!,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  googleSignIn: async function (): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Signed in
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      const userPremiumData = userDoc.data()?.isPremium ?? false;

      const userData: User = {
        email: user.email!,
        name: user.displayName!,
        isPremium: userPremiumData,
        emailVerified: user.emailVerified,
      };

      return userData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  passwordReset: async function (
    userForgotPassword: UserForgotPassword
  ): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, userForgotPassword.email);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
};
