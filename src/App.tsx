import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications/Applications";
import Navigation from "./Navigation";
import { DaisyUIThemes } from "./themes";
import { useEffect, useState } from "react";

function App() {
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
    <>
      <Navigation onChangeTheme={changeTheme} theme={themeMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
