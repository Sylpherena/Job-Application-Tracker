import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-0">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div className="dropdown dropdown-hover dropdown-bottom z-10">
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
                <Link to="/applications">Applications</Link>
              </li>
              <li>
                <Link to={"/"}>Add New</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to="/applications">Applications2</Link>
        </li>
      </ul>
    </div>
  );
}
