import { AlignLeft, ChevronDown } from "lucide-react";
import { ThemeController } from "./ThemeController";
import { DaisyUIThemes } from "./themes";

type Props = {
  onChangeTheme: (theme: DaisyUIThemes) => void;
  theme: DaisyUIThemes;
};

const Navigation = (props: Props) => {
  return (
    <div className="drawer">
      <input id="navigation-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar p-0">
          <div className="navbar-start">
            <div tabIndex={0} className="lg:hidden">
              <label
                htmlFor="navigation-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <AlignLeft />
              </label>
            </div>
            <a className="btn btn-ghost text-xl">Application_Tracker</a>
          </div>
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
          <div className="navbar-end">
            <ThemeController
              onChange={props.onChangeTheme}
              theme={props.theme}
            />
          </div>
        </div>
        <div className="bg-primary bg-opacity-30 h-0.5 brightness-90"></div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="navigation-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary min-h-full w-80 p-4 text-primary-content">
          {/* Sidebar content here */}
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/applications">Applications</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
