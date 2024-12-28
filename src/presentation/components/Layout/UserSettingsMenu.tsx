import { LogOut, Settings, UserRound, UserRoundCog } from "lucide-react";

export default function UserSettingsMenu() {
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
        <UserRound
          fill=""
          className="text-secondary-content fill-secondary-content"
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow text-bold"
      >
        <li>
          <a className="px-0 font-semibold" href="/account">
            <UserRoundCog className="h-3.5" />
            Account
          </a>
        </li>
        <li>
          <a className="px-0 font-semibold" href="/settings">
            <Settings className="h-3.5" />
            Settings
          </a>
        </li>
        <li>
          <a className="px-0 text-error font-semibold">
            <LogOut className="h-3.5" />
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
}
