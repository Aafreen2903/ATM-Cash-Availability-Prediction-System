import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Userdashboard from "./pages/Userdashboard";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Don't automatically scroll when changing between normal pages
    if (location.hash) {
      const id = location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="app-layout">

      {/* ONE AND ONLY NAVBAR */}
      <Navbar />

      <main className="main-content">
        <Routes>

          {/* HOME - SINGLE PAGE */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER DASHBOARD */}
          <Route path="/dashboard" element={<Userdashboard />} />

        </Routes>
      </main>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;