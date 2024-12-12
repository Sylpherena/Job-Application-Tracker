import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Navigation from "./components/Layout/Navigation";
import ThemeProvider from "./providers/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
