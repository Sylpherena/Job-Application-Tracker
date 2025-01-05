import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
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
  signUp: async function (userData: UserCreate): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.name,
      });

      await sendEmailVerification(user);

      return user.email!;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  signIn: async function (signInData: UserSignIn): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );

      // Signed in
      const user = userCredential.user;

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  googleSignIn: async function (): Promise<FirebaseUser> {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Signed in
      const user = result.user;

      return user;
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
  signOut: async function (): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(error as string);
      }
    }
  },
  getUserDetails: async function (user: FirebaseUser): Promise<User | null> {
    try {
      await user.reload();
      const updatedUser = auth.currentUser;
      if (!updatedUser) {
        throw new Error("User couldn't be found");
      }
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      const userPremiumData = userDoc.data()?.isPremium ?? false;

      return {
        isPremium: userPremiumData,
        name: updatedUser.displayName!,
        email: updatedUser.email!,
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
};
