import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./providers/theme/ThemeProvider";
import ToastProvider from "./providers/Toast/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Settings from "./presentation/pages/Settings";
import DataProvider from "./providers/data/DataProvider";
import AuthProvider from "./providers/auth/AuthProvider";
import Navigation from "./presentation/components/Layout/Navigation";
import Home from "./presentation/pages/Home";
import Applications from "./presentation/pages/Applications";
import Authentication from "./presentation/pages/Authentication";

function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <Router>
                <Navigation />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="authentication">
                    <Route
                      path="sign-in"
                      element={<Authentication pageParam="sign-in" />}
                    />
                    <Route
                      path="sign-up"
                      element={<Authentication pageParam="sign-up" />}
                    />
                    <Route
                      path="forgot-password"
                      element={<Authentication pageParam="forgot-password" />}
                    />
                  </Route>
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </Router>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
