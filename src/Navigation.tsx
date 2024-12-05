import { AlignLeft, ChevronDown } from "lucide-react";
import { ThemeController } from "./ThemeController";

const Navigation = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div tabIndex={0} className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <AlignLeft />
              </label>
            </div>
            <a className="btn btn-ghost text-xl">Application_Tracker</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <div className="dropdown dropdown-hover dropdown-bottom ">
                  {
                    //submenu parent and submenu list
                  }
                  <div tabIndex={0} role="button" className="flex gap-1">
                    Parent
                    <ChevronDown />
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
                <a>Another Link</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <ThemeController />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
