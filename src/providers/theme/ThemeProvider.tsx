import React, { useEffect, useState } from "react";
import { daisyUIThemes, DaisyUITheme } from "./themes";
import { ThemeContext } from "./ThemeContext";

const isValidTheme = (theme: string): theme is DaisyUITheme => {
  return daisyUIThemes.includes(theme);
};

export default function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [themeMode, setThemeMode] = useState<DaisyUITheme>(() => {
    return (localStorage.getItem("theme") || "light") as DaisyUITheme;
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

  const changeTheme = (theme: DaisyUITheme) => {
    setThemeMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themeMode, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
