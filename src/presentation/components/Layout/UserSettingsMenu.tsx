import { LogOut, Settings, UserRound, UserRoundCog } from "lucide-react";
import useToast from "../../../providers/Toast/ToastContext";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "./queries";
import { useAuth } from "../../../providers/auth/AuthContext";

export default function UserSettingsMenu() {
  const showToast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOutSuccess = () => {
    navigate("/");
    showToast("Logged out.", "success");
  };

  const { mutate: mutateLogOut, isPending: isLogOutPending } =
    useLogOutMutation(handleSignOutSuccess);

  const onLogOut = async () => {
    mutateLogOut();
  };

  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end z-10">
      {
        //submenu parent and submenu list
      }
      <div
        tabIndex={0}
        role="button"
        className="flex gap-1 btn bg-secondary border-2 rounded-full p-2 w-12"
      >
        <p className="text-secondary-content text-bold text-xl">
          {user?.name.charAt(0)}
        </p>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow text-bold"
      >
        <li>
          {/* <a className="px-0 font-semibold" href="/account">
            <UserRoundCog className="h-3.5" />
            Account
          </a> */}
          <p className="whitespace-pre-line">
            Hi {user?.name}!
            <br />
            {user?.email}
          </p>
        </li>
        <li>
          <a className="px-0 font-semibold" href="/settings">
            <Settings className="h-3.5" />
            Settings
          </a>
        </li>
        <li onClick={onLogOut}>
          <a className="px-0 text-error font-semibold">
            <LogOut className="h-3.5" />
            Log out
            {isLogOutPending && (
              <span
                aria-label="Logging out, please wait"
                className="loading loading-spinner loading-sm"
              />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}
