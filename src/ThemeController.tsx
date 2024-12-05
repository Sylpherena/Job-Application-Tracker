import { ChevronDown } from "lucide-react";
import { daisyUIThemes } from "./themes";

export function ThemeController() {
  return (
    <div className="dropdown mx-4 h-min">
      <div tabIndex={0} role="button" className="btn mx-2">
        Theme
        <ChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 rounded-box z-[1] p-2 shadow-2xl overflow-y-auto max-h-64 max-w-fit"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
          />
        </li>
        {daisyUIThemes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
              value={theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
