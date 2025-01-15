import { ChevronDown } from "lucide-react";
import { useTheme } from "../../../providers/theme/ThemeContext";
import { DaisyUITheme, daisyUIThemes } from "../../../providers/theme/themes";
import clsx from "clsx";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (selectedTheme: DaisyUITheme) => {
    setTheme(selectedTheme);
  };

  const formatThemeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div
      aria-labelledby="theme-selector-button"
      className="dropdown h-min z-50"
    >
      <div
        id="theme-selector-button"
        aria-label="Theme Selector"
        tabIndex={0}
        role="button"
        className="btn mx-2 btn-sm flex w-36"
      >
        <span className="flex gap-1 items-center justify-center">
          {formatThemeName(theme) ?? "Theme"}
          <ChevronDown />
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 rounded-box z-50 shadow-2xl overflow-y-auto max-h-64 max-w-max"
      >
        {daisyUIThemes.map((t) => (
          <li key={t} className="px-2 py-1">
            <button
              data-theme={t}
              onClick={() => handleChangeTheme(t as DaisyUITheme)}
              name="theme-dropdown"
              className={clsx(
                "btn btn-sm btn-ghost bg-base-100 text-base-content justify-between flex w-40 hover:bg-base-300",
                [{ "border-2 border-primary": t === theme }]
              )}
              aria-label={formatThemeName(t)}
            >
              {formatThemeName(t)}
              <span className="px-1 gap-0.5 flex">
                <div className="bg-primary h-4 w-2 rounded-sm" />
                <div className="bg-secondary h-4 w-2 rounded-sm" />
                <div className="bg-accent h-4 w-2 rounded-sm" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
