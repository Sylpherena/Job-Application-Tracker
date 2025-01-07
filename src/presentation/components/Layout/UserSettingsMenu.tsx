import { LogOut, Settings } from "lucide-react";
import useToast from "../../../providers/Toast/ToastContext";
import { useLogOutMutation } from "./queries";
import { useAuth } from "../../../providers/auth/AuthContext";
import { Link } from "react-router-dom";

export default function UserSettingsMenu() {
  const showToast = useToast();
  const { user } = useAuth();

  const handleSignOutSuccess = () => {
    showToast("Logged out.", "success");
  };

  const { mutate: mutateLogOut, isPending: isLogOutPending } =
    useLogOutMutation(handleSignOutSuccess);

  const onLogOut = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    mutateLogOut();
    onLinkClick(e);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end z-10">
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
        className="dropdown-content menu rounded-box z-[1] w-52 shadow text-bold bg-base-100"
      >
        <div className="flex gap-2 justify-center py-4 font-semibold">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-6 rounded-full">
              <span className="text-xs">{user?.name.charAt(0)}</span>
            </div>
          </div>
          {user?.name}
        </div>
        <li className="border-t-2">
          <Link
            className="px-0 font-semibold"
            to={"/settings"}
            onClick={onLinkClick}
          >
            <Settings className="h-3.5" />
            Settings
          </Link>
        </li>
        <li>
          <Link
            className="px-0 text-error font-semibold"
            to={"/"}
            onClick={onLogOut}
          >
            <LogOut className="h-3.5" />
            Log out
            {isLogOutPending && (
              <span
                aria-label="Logging out, please wait"
                className="loading loading-spinner loading-sm"
              />
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
