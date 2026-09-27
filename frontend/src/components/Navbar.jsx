import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const token = localStorage.getItem("token");

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error reading user:", error);
    user = null;
  }

  const isLoggedIn = Boolean(token);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    // Prevent multiple clicks
    if (loggingOut) return;

    setLoggingOut(true);

    // Show logout animation for 2.5 seconds
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoggingOut(false);

      navigate("/");
    }, 2500);
  };


  /* =====================================================
     HOME / ABOUT / CONTACT NAVIGATION
  ===================================================== */

  const handleSectionClick = (section) => {

    // If already on Home page
    if (window.location.pathname === "/") {

      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // If on Dashboard / Login / Register,
    // return to Home and open the requested section.
    window.location.href = `/#${section}`;
  };


  return (
    <>
      {/* =================================================
          LOGOUT OVERLAY
      ================================================= */}

      {loggingOut && (
        <div className="logout-overlay">

          <div className="logout-card">

            <div className="logout-spinner">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <h3>Signing you out...</h3>

            <p>Please wait a moment</p>

          </div>

        </div>
      )}


      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <nav className="atmsmart-navbar">

        <div className="atmsmart-navbar-container">

          {/* =================================================
              BRAND
          ================================================= */}

          <Link
            to="/"
            className="atmsmart-brand"
          >

            <div className="atmsmart-brand-icon">
              <i className="bi bi-credit-card-2-front"></i>
            </div>

            <span>SmartATM</span>

          </Link>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="atmsmart-nav-links">

            {/* HOME */}

            <button
              type="button"
              className="atmsmart-nav-link"
              onClick={() => handleSectionClick("home")}
            >
              Home
            </button>


            {/* ABOUT */}

            <button
              type="button"
              className="atmsmart-nav-link"
              onClick={() => handleSectionClick("about")}
            >
              About
            </button>


            {/* CONTACT */}

            <button
              type="button"
              className="atmsmart-nav-link"
              onClick={() => handleSectionClick("contact")}
            >
              Contact
            </button>


            {/* =================================================
                DASHBOARD
                ONLY VISIBLE AFTER LOGIN
            ================================================= */}

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="atmsmart-nav-link dashboard-nav-link"
              >
                Dashboard
              </Link>
            )}


            {/* =================================================
                LOGIN + REGISTER
                ONLY WHEN LOGGED OUT
            ================================================= */}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="atmsmart-nav-link"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="atmsmart-register-btn"
                >
                  Register
                </Link>
              </>
            )}


            {/* =================================================
                LOGOUT
                ONLY WHEN LOGGED IN
            ================================================= */}

            {isLoggedIn && (
              <button
                type="button"
                className="atmsmart-logout-btn"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            )}

          </div>

        </div>

      </nav>
    </>
  );
};

export default Navbar;