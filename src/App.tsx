import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Navigation from "./Navigation";

function App() {
  //const [themeMode, setThemeMode] = useState<DaisyUIThemes>("bumblebee");

  // useEffect(() => {
  //   const darkModeMediaQuery = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   );
  //   setIsDarkMode(darkModeMediaQuery.matches);

  //   const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
  //   darkModeMediaQuery.addEventListener("change", handleChange);

  //   return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  // }, []);

  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle("dark");
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <>
      <Navigation />
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
