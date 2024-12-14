import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Navigation from "./components/Layout/Navigation";
import ThemeProvider from "./providers/theme/ThemeProvider";
import ToastProvider from "./components/Layout/Toast/ToastProvider";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Navigation />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
