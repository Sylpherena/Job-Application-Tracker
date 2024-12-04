import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Navigation from "./Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <div className="pt-16">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
