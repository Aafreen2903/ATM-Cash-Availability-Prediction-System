import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginUser, googleLoginUser } from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import "./AuthPages.css";

const Login = () => {
    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Role
    const [role, setRole] = useState("user");

    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    /* =====================================================
       HANDLE NORMAL LOGIN
    ===================================================== */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Basic validation
        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            // Send role to backend
            const data = await loginUser({
                email: email.trim(),
                password,
                role,
            });
            
           
            // Store JWT
            localStorage.setItem("token", data.token);

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            
            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            setError(
                error?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };


    /* =====================================================
       HANDLE GOOGLE LOGIN
    ===================================================== */

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setError("");
            setLoading(true);

            if (!credentialResponse?.credential) {
                setError("Google authentication failed.");
                return;
            }

            const data = await googleLoginUser(
                credentialResponse.credential
            );

            // Store JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Redirect based on role returned by backend
            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            setError(
                error?.message ||
                "Google login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* =================================================
                    LEFT BRANDING SECTION
                ================================================= */}

                <div className="auth-brand-section">

                    <div className="brand-icon">
                        <i className="bi bi-credit-card-2-front"></i>
                    </div>

                    <h1>ATMSmart</h1>

                    <h2>
                        Smart ATM Cash Prediction
                    </h2>

                    <p>
                        Predict ATM cash requirements,
                        reduce cash shortages, and make
                        smarter decisions with
                        data-driven insights.
                    </p>


                    <div className="brand-features">

                        <div>
                            <i className="bi bi-graph-up-arrow"></i>

                            <span>
                                Smart Cash Predictions
                            </span>
                        </div>


                        <div>
                            <i className="bi bi-shield-check"></i>

                            <span>
                                Secure Authentication
                            </span>
                        </div>


                        <div>
                            <i className="bi bi-geo-alt"></i>

                            <span>
                                ATM Location Services
                            </span>
                        </div>


                        <div>
                            <i className="bi bi-lightning-charge"></i>

                            <span>
                                Real-Time Insights
                            </span>
                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT LOGIN SECTION
                ================================================= */}

                <div className="auth-form-section">

                    {/* Mobile logo */}

                    <div className="mobile-brand-icon">
                        <i className="bi bi-credit-card-2-front"></i>
                    </div>


                    {/* Header */}

                    <div className="auth-form-header">

                        <h2>
                            Welcome Back 👋
                        </h2>

                        <p>
                            Sign in to continue to your
                            ATMSmart account.
                        </p>

                    </div>


                    {/* =================================================
                        ERROR MESSAGE
                    ================================================= */}

                    {error && (
                        <div
                            className="alert alert-danger d-flex align-items-center gap-2 auth-alert"
                            role="alert"
                        >
                            <i className="bi bi-exclamation-circle-fill"></i>

                            <span>{error}</span>

                            <button
                                type="button"
                                className="btn-close ms-auto"
                                aria-label="Close"
                                onClick={() => setError("")}
                            ></button>
                        </div>
                    )}


                    {/* =================================================
                        LOGIN FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        {/* =================================================
                            ROLE SELECTION
                        ================================================= */}

                        <div className="form-group-custom">

                            <label className="form-label">
                                Login as
                            </label>


                            <div className="role-selection">

                                {/* USER */}

                                <button
                                    type="button"
                                    className={`role-card ${
                                        role === "user"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setRole("user");
                                        setError("");
                                    }}
                                    disabled={loading}
                                >

                                    <div className="role-icon">
                                        <i className="bi bi-person"></i>
                                    </div>

                                    <div className="role-content">

                                        <strong>
                                            User
                                        </strong>

                                        <small>
                                            Access predictions
                                        </small>

                                    </div>

                                    {role === "user" && (
                                        <i className="bi bi-check-circle-fill role-check"></i>
                                    )}

                                </button>


                                {/* ADMIN */}

                                <button
                                    type="button"
                                    className={`role-card ${
                                        role === "admin"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setRole("admin");
                                        setError("");
                                    }}
                                    disabled={loading}
                                >

                                    <div className="role-icon">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>

                                    <div className="role-content">

                                        <strong>
                                            Admin
                                        </strong>

                                        <small>
                                            Manage system
                                        </small>

                                    </div>

                                    {role === "admin" && (
                                        <i className="bi bi-check-circle-fill role-check"></i>
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="form-group-custom">

                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <i className="bi bi-envelope input-icon"></i>

                                <input
                                    id="email"
                                    type="email"
                                    className="form-input"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div className="form-group-custom">

                            <div className="password-label-row">

                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>

                            </div>


                            <div className="input-wrapper">

                                <i className="bi bi-lock input-icon"></i>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input password-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            REMEMBER ME
                        ================================================= */}

                        <div className="remember-row">

                            <label className="remember-label">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(
                                            e.target.checked
                                        )
                                    }
                                    disabled={loading}
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>

                        </div>


                        {/* =================================================
                            LOGIN BUTTON
                        ================================================= */}

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            disabled={loading}
                        >

                            {loading ? (
                                <span className="auth-spinner-row">

                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>

                                    Signing in...

                                </span>
                            ) : (
                                <span className="login-button-content">

                                    Sign In

                                    <i className="bi bi-arrow-right"></i>

                                </span>
                            )}

                        </Button>


                        {/* =================================================
                            DIVIDER
                        ================================================= */}

                        <div className="auth-divider">

                            <span>
                                OR
                            </span>

                        </div>


                        {/* =================================================
                            GOOGLE LOGIN
                        ================================================= */}

                        <div className="google-login-container">

                            <GoogleLogin
                                onSuccess={
                                    handleGoogleSuccess
                                }

                                onError={() => {
                                    setError(
                                        "Google Login Failed. Please try again."
                                    );
                                }

                                }

                                useOneTap={false}
                            />

                        </div>


                        {/* =================================================
                            REGISTER
                        ================================================= */}

                        <p className="auth-switch">

                            Don't have an account?

                            <Link to="/register">
                                Create account
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Login;