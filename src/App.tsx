import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Navigation from "./components/Layout/Navigation";
import ThemeProvider from "./providers/theme/ThemeProvider";
import ToastProvider from "./providers/Toast/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Navigation />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/authentication/:tab" element={<Authentication />} />
            </Routes>
          </Router>
        </QueryProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
