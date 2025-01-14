import { User as FirebaseUser } from "firebase/auth";
import { useResendVerificationEmailMutation } from "./queries";
import useToast from "../../../../providers/Toast/ToastContext";

export default function VerifyEmail(props: { user?: FirebaseUser }) {
  const { user } = props;

  const showToast = useToast();

  const handleResendSuccess = () => {
    showToast("Verification e-mail sent", "success");
  };

  const { mutate: mutateResend, isPending: isResendPending } =
    useResendVerificationEmailMutation(handleResendSuccess);

  const onResend = async () => {
    if (user) {
      mutateResend(user);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-center p-4">
      <p className="text-base-content text-2xl font-extrabold">
        Please verify your email adress before signing in.
      </p>
      <p className="text-base-content">
        We sent a verification e-mail to
        <strong>{user ? " " + user.email : "your email."}</strong>
      </p>
      <p className="text-base-content">
        If you don't see the e-mail in your inbox, please check your
        <strong> spam or junk folder.</strong>
      </p>
      <div className="flex w-full justify-center pt-4">
        <button className="btn btn-primary" type="submit" onClick={onResend}>
          Resend Verification E-mail
          {isResendPending && (
            <span
              aria-label="Resending verification e-mail, please wait"
              className="loading loading-spinner loading-sm"
            />
          )}
        </button>
      </div>
      {/*TODO: add support email */}
      <p className="text-base-content text-xs">
        If you continue to experience issues, please contact our support team at
        <strong> [support@example.com].</strong>
      </p>
    </div>
  );
}
