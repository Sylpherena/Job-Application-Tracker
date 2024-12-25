import Signin from "./Forms/Signin";
import Signup from "./Forms/Signup";
import { useNavigate } from "react-router-dom";

interface AuthenticationTabsProps {
  pageParam: "sign-in" | "sign-up";
}

export default function AuthenticationTabs(props: AuthenticationTabsProps) {
  const { pageParam } = props;
  const navigate = useNavigate();

  const isSignUpChecked = pageParam === "sign-up";

  return (
    <div className="card border border-primary bg-base-100 p-4 lg:p-10 shadow-md max-w-lg w-fit lg:mx-16 lg:w-full h-fit z-[1]">
      <div role="tablist" className="tabs tabs-lifted">
        <input
          id="sign-in-tab"
          type="radio"
          name="authentication-tabs"
          role="tab"
          className="tab font-semibold text-base whitespace-nowrap"
          aria-label="Sign In"
          aria-controls="sign-in-panel"
          defaultChecked={!isSignUpChecked}
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        />
        <Signin />
        <input
          id="sign-up-tab"
          type="radio"
          name="authentication-tabs"
          role="tab"
          className="tab font-semibold text-base whitespace-nowrap"
          aria-label="Sign Up"
          aria-controls="sign-up-panel"
          defaultChecked={isSignUpChecked}
          onClick={() => {
            navigate("/authentication/sign-up");
          }}
        />
        <Signup />
      </div>
    </div>
  );
}
