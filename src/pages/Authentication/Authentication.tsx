import { useParams } from "react-router-dom";
import AuthenticationTabs from "./AuthenticationTabs";
import ForgotPassword from "./Forms/ForgotPassword";

export default function Authentication() {
  const { tab } = useParams();
  return (
    <div className="flex flex-1 h-full min-h-screen bg-primary/20 overflow-auto">
      <div className="hidden lg:flex w-1/2 bg-base-100 items-center justify-center p-12">
        <div className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <p className="py-6 text-center">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-4">
        {tab === "forgot-password" ? (
          <ForgotPassword />
        ) : (
          <AuthenticationTabs />
        )}
      </div>
    </div>
  );
}
