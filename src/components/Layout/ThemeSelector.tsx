import { ChevronDown } from "lucide-react";
import { DaisyUITheme, daisyUIThemes } from "../../providers/theme/themes";
import { ChangeEvent } from "react";
import { useTheme } from "../../providers/theme/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value as DaisyUITheme;
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
        className="btn mx-2 btn-sm flex"
      >
        <span className="flex gap-1 items-center justify-center">
          {formatThemeName(theme) ?? "Theme"}
          <ChevronDown />
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 rounded-box z-[1] shadow-2xl overflow-y-auto max-h-64 max-w-fit"
      >
        {daisyUIThemes.map((t) => (
          <li key={t}>
            <input
              onChange={handleChange}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-ghost justify-start"
              aria-label={formatThemeName(t)}
              value={t}
              checked={t === theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
