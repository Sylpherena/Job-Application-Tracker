import { useNavigate } from "react-router-dom";
import { useGoogleSignInMutation } from "./queries";

export default function LoginThirdParty() {
  const navigate = useNavigate();

  const handleGoogleSignInSuccess = () => {
    navigate("/");
  };

  const { mutate: mutateGoogleSignIn, isPending: isGoogleSignInPending } =
    useGoogleSignInMutation(handleGoogleSignInSuccess);

  const onGoogleSignInClick = async () => {
    mutateGoogleSignIn();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        disabled={isGoogleSignInPending}
        onClick={onGoogleSignInClick}
        className="btn btn-ghost border-1 border-base-content flex gap-1"
      >
        <img
          className="h-8"
          src="/src/presentation/assets/google-icon.svg"
          alt="Google-Icon"
        />
        {isGoogleSignInPending && (
          <span
            aria-label="Signing in with google, please wait"
            className="loading loading-spinner loading-sm"
          />
        )}
        Login with Google
      </button>
      <button
        disabled={isGoogleSignInPending}
        className="btn btn-ghost border-1 border-base-content flex gap-1"
      >
        <img
          className="h-8"
          src="/src/presentation/assets/facebook-icon.svg"
          alt="Facebook-Icon"
        />
        Login with Facebook
      </button>
    </div>
  );
}
