import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../data/firebase/firebaseConnection";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDetailedUser } from "./queries";
import Modal from "../../presentation/components/Modal";
import VerifyEmail from "../../presentation/pages/Authentication/VerifyEmail/VerifyEmail";

export default function AuthProvider(props: React.PropsWithChildren) {
  const { children } = props;
  const [userToGetDetails, setUserToGetDetails] = useState<
    FirebaseUser | null | undefined
  >(undefined);

  const [verifyUser, setVerifyUser] = useState<FirebaseUser | undefined>(
    undefined
  );

  const { data: userWithDetails, isLoading } =
    useDetailedUser(userToGetDetails);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null && user.emailVerified === false) {
        auth.signOut();
        setVerifyUser(user ?? undefined);
      } else {
        setUserToGetDetails(user);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  if (isLoading || userToGetDetails === undefined) {
    return (
      <progress className="progress absolute inset-x-0 top-0 w-full"></progress>
    );
  }
  return (
    <AuthContext.Provider value={{ user: userWithDetails ?? null }}>
      {children}
      <Modal
        isOpen={!!verifyUser}
        onModalStateChange={() => setVerifyUser(undefined)}
      >
        <VerifyEmail user={verifyUser} />
      </Modal>
    </AuthContext.Provider>
  );
}
