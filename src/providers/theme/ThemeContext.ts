import { createContext, useContext } from "react";
import { DaisyUIThemes } from "../../themes";

export const ThemeContext = createContext<{
  theme: DaisyUIThemes;
  setTheme: (theme: DaisyUIThemes) => void;
}>({ theme: "light", setTheme: () => null });

export const useTheme = () => useContext(ThemeContext);
