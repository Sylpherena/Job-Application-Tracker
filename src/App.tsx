import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./providers/theme/ThemeProvider";
import ToastProvider from "./providers/Toast/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Account from "./presentation/pages/Account";
import Settings from "./presentation/pages/Settings";
import DataProvider from "./providers/data/DataProvider";
import Navigation from "./presentation/components/Layout/Navigation";
import Home from "./presentation/pages/Home";
import Applications from "./presentation/pages/Applications";
import Authentication from "./presentation/pages/Authentication";

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <ToastProvider>
          <QueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <Navigation />
            <Router>
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
                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </Router>
          </QueryProvider>
        </ToastProvider>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
