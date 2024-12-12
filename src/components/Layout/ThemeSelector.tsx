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
        {daisyUIThemes.map((t) => (
          <li key={t}>
            <input
              onChange={handleChange}
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
              value={t}
              checked={t === theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
