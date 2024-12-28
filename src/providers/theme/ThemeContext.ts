import { createContext, useContext } from "react";
import { DaisyUITheme } from "./themes";

export const ThemeContext = createContext<{
  theme: DaisyUITheme;
  setTheme: (theme: DaisyUITheme) => void;
}>({ theme: "light", setTheme: () => null });

export const useTheme = () => useContext(ThemeContext);
