import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component for ATM Smart
 */
const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M6 12h.01M18 12h.01" />
                        </svg>
                    </div>
                    <span className="brand-text">ATM <span className="brand-highlight">Smart</span></span>
                </Link>

                <nav className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
                        end
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
                    >
                        Register
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
