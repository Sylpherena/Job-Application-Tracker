import Signin from "./Forms/Signin";
import Signup from "./Forms/Signup";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthenticationTabs() {
  const { tab } = useParams();
  const navigate = useNavigate();
  return (
    <div className="card border border-primary bg-base-100 p-4 lg:p-10 shadow-md max-w-lg w-fit lg:mx-16 lg:w-full h-fit z-[1]">
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="authentication-tabs"
          role="tab"
          className="tab font-semibold text-base whitespace-nowrap"
          aria-label="Sign In"
          defaultChecked={tab !== "sign-up"}
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        />
        <Signin />
        <input
          type="radio"
          name="authentication-tabs"
          role="tab"
          className="tab font-semibold text-base whitespace-nowrap"
          aria-label="Sign Up"
          defaultChecked={tab === "sign-up"}
          onClick={() => {
            navigate("/authentication/sign-up");
          }}
        />
        <Signup />
      </div>
    </div>
  );
}
