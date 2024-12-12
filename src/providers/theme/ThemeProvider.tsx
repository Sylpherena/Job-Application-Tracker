import React, { useEffect, useState } from "react";
import { daisyUIThemes, DaisyUIThemes } from "./themes";
import { ThemeContext } from "./ThemeContext";

const isValidTheme = (theme: string): theme is DaisyUIThemes => {
  return daisyUIThemes.includes(theme);
};

export default function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [themeMode, setThemeMode] = useState<DaisyUIThemes>(() => {
    return (localStorage.getItem("theme") || "light") as DaisyUIThemes;
  });

  useEffect(() => {
    if (isValidTheme(themeMode)) {
      setThemeMode(themeMode);
    } else {
      console.warn(`Invalid theme selected: ${themeMode}`);
      setThemeMode("light");
    }
    // Apply the current theme to the document's root element
    document.documentElement.setAttribute("data-theme", themeMode);
    // Save the current theme to local storage
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const changeTheme = (theme: DaisyUIThemes) => {
    setThemeMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themeMode, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
