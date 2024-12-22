import { AlignLeft } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import NavMenu from "./NavMenu";

const Navigation = () => {
  return (
    <div className="drawer h-16">
      <input id="navigation-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar p-0 z-50">
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
            <a
              className="btn btn-ghost text-lg sm:text-xl leading-6 break-words w-min sm:w-fit p-1 h-fit sm:px-2 mx-2"
              href="/"
            >
              Application _Tracker
            </a>
          </div>
          <NavMenu />
          <div className="navbar-end mx-4">
            <ThemeSelector />
            <a
              className="btn btn-secondary btn-sm underline"
              href="/authentication/sign-in"
            >
              Sign in
            </a>
          </div>
        </div>
        <div className="bg-primary bg-opacity-30 h-0.5 brightness-90"></div>
      </div>
      <div className="drawer-side z-[9999]">
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
