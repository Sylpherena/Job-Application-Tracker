import PageContent from "./PageContent";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="flex flex-1 bg-secondary/30 overflow-auto p-4 sm:p-8 justify-center w-full h-max">
      <div className="card border border-primary bg-base-100 rounded-btn overflow-hidden w-full lg:mx-16 gap-4 max-w-5xl">
        <div className="drawer lg:drawer-open">
          <input
            id="settings-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <PageContent />
          <div className="drawer-side shadow-lg border-r border-primary h-full">
            <ul className="menu bg-base-100 text-base-content min-h-full w-64 p-4">
              {/* Sidebar content here */}
              <li>
                <Link to={"#"}>Sidebar Item 1</Link>
              </li>
              <li>
                <Link to={"#"}>Sidebar Item 2</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
