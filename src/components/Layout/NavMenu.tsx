import { ChevronDown } from "lucide-react";

export default function NavMenu() {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-0">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <div className="dropdown dropdown-hover dropdown-bottom ">
            {
              //submenu parent and submenu list
            }
            <div tabIndex={0} role="button" className="flex gap-1">
              Parent
              <ChevronDown className="text-primary brightness-90" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content left-1/2 -translate-x-1/2 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a href="/applications">Applications</a>
              </li>
              <li>
                <a>Add New</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="/applications">Applications2</a>
        </li>
      </ul>
    </div>
  );
}
