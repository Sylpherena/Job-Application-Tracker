import React, { useEffect, useState } from "react";
import { DaisyUIThemes } from "../../themes";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [themeMode, setThemeMode] = useState<DaisyUIThemes>(() => {
    return (localStorage.getItem("theme") || "light") as DaisyUIThemes;
  });

  useEffect(() => {
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
