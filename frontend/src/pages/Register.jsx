import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [role, setRole] = useState("user");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [agreeTerms, setAgreeTerms] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    /* =========================================
       INPUT CHANGE
    ========================================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };


    /* =========================================
       PASSWORD STRENGTH
    ========================================= */

    const getPasswordStrength = () => {
        const password = formData.password;

        if (!password) {
            return {
                score: 0,
                text: "",
            };
        }

        let score = 0;

        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            return {
                score: 1,
                text: "Weak password",
            };
        }

        if (score <= 3) {
            return {
                score: 2,
                text: "Medium password",
            };
        }

        return {
            score: 3,
            text: "Strong password",
        };
    };

    const passwordStrength = getPasswordStrength();


    /* =========================================
       SUBMIT
    ========================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        /* Name validation */

        if (!formData.name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        /* Email validation */

        if (!formData.email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        /* Password validation */

        if (formData.password.length < 6) {
            setError(
                "Password must be at least 6 characters long."
            );
            return;
        }

        /* Confirm password */

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        /* Terms */

        if (!agreeTerms) {
            setError(
                "Please agree to the Terms & Conditions."
            );
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: role,
            });

            setSuccess(
                data.message ||
                "Account created successfully!"
            );

            /* Clear form */

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setRole("user");
            setAgreeTerms(false);

            /*
             * Keep user on the registration page for
             * a moment so they can see the success message.
             */

            setTimeout(() => {
                navigate("/login");
            }, 1800);

        } catch (error) {
            setError(
                error?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="register-page">

            <div className="register-card">

                {/* =========================================
                    LEFT BLUE SECTION
                ========================================= */}

                <div className="register-left">

                    <div className="register-brand">

                        <div className="register-brand-icon">
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>

                        <span>ATMSmart</span>

                    </div>


                    <div className="register-left-content">

                        <div className="register-small-label">
                            SMART ATM MANAGEMENT
                        </div>

                        <h1>
                            Build smarter.
                            <br />
                            Manage better.
                        </h1>

                        <p>
                            Create your ATMSmart account and
                            access intelligent ATM cash
                            prediction and management tools.
                        </p>


                        <div className="register-benefits">

                            <div className="benefit-item">

                                <div className="benefit-icon">
                                    <i className="bi bi-graph-up-arrow"></i>
                                </div>

                                <div>
                                    <strong>
                                        Smart Predictions
                                    </strong>

                                    <span>
                                        Data-driven ATM cash insights
                                    </span>
                                </div>

                            </div>


                            <div className="benefit-item">

                                <div className="benefit-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>

                                <div>
                                    <strong>
                                        Secure Access
                                    </strong>

                                    <span>
                                        Protected account authentication
                                    </span>
                                </div>

                            </div>


                            <div className="benefit-item">

                                <div className="benefit-icon">
                                    <i className="bi bi-geo-alt"></i>
                                </div>

                                <div>
                                    <strong>
                                        ATM Services
                                    </strong>

                                    <span>
                                        Access location-based ATM services
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="register-left-footer">

                        <i className="bi bi-lightbulb"></i>

                        <span>
                            Smarter decisions start with better data.
                        </span>

                    </div>

                </div>


                {/* =========================================
                    RIGHT FORM SECTION
                ========================================= */}

                <div className="register-right">

                    <div className="register-form-container">

                        {/* Mobile logo */}

                        <div className="register-mobile-icon">
                            <i className="bi bi-person-plus"></i>
                        </div>


                        {/* Heading */}

                        <div className="register-heading">

                            <h2>
                                Create your account
                            </h2>

                            <p>
                                Join ATMSmart and get started today.
                            </p>

                        </div>


                        {/* =====================================
                            SUCCESS
                        ===================================== */}

                        {success && (
                            <div className="register-alert success-alert">

                                <i className="bi bi-check-circle-fill"></i>

                                <span>
                                    {success}
                                </span>

                            </div>
                        )}


                        {/* =====================================
                            ERROR
                        ===================================== */}

                        {error && (
                            <div className="register-alert error-alert">

                                <i className="bi bi-exclamation-circle-fill"></i>

                                <span>
                                    {error}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setError("")}
                                >
                                    ×
                                </button>

                            </div>
                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="register-form"
                        >

                            {/* =================================
                                ROLE
                            ================================= */}

                            <div className="register-field">

                                <label>
                                    Account type
                                </label>

                                <div className="register-role-grid">

                                    {/* USER */}

                                    <button
                                        type="button"
                                        className={`register-role ${
                                            role === "user"
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setRole("user")
                                        }
                                        disabled={loading}
                                    >

                                        <div className="role-symbol">
                                            <i className="bi bi-person"></i>
                                        </div>

                                        <div className="role-info">

                                            <strong>
                                                User
                                            </strong>

                                            <span>
                                                View predictions
                                            </span>

                                        </div>

                                        {role === "user" && (
                                            <i className="bi bi-check-circle-fill selected-check"></i>
                                        )}

                                    </button>


                                    {/* ADMIN */}

                                    <button
                                        type="button"
                                        className={`register-role ${
                                            role === "admin"
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setRole("admin")
                                        }
                                        disabled={loading}
                                    >

                                        <div className="role-symbol">
                                            <i className="bi bi-shield-lock"></i>
                                        </div>

                                        <div className="role-info">

                                            <strong>
                                                Admin
                                            </strong>

                                            <span>
                                                Manage system
                                            </span>

                                        </div>

                                        {role === "admin" && (
                                            <i className="bi bi-check-circle-fill selected-check"></i>
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* =================================
                                NAME
                            ================================= */}

                            <div className="register-field">

                                <label htmlFor="name">
                                    Full name
                                </label>

                                <div className="register-input-box">

                                    <i className="bi bi-person"></i>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        disabled={loading}
                                        required
                                    />

                                </div>

                            </div>


                            {/* =================================
                                EMAIL
                            ================================= */}

                            <div className="register-field">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className="register-input-box">

                                    <i className="bi bi-envelope"></i>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        disabled={loading}
                                        required
                                    />

                                </div>

                            </div>


                            {/* =================================
                                PASSWORD
                            ================================= */}

                            <div className="register-field">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="register-input-box">

                                    <i className="bi bi-lock"></i>

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        disabled={loading}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="register-eye"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        disabled={loading}
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


                                {/* Password strength */}

                                {formData.password && (
                                    <div className="password-strength">

                                        <div className="strength-line">

                                            <span
                                                className={
                                                    passwordStrength.score >= 1
                                                        ? "strength-active weak"
                                                        : ""
                                                }
                                            ></span>

                                            <span
                                                className={
                                                    passwordStrength.score >= 2
                                                        ? "strength-active medium"
                                                        : ""
                                                }
                                            ></span>

                                            <span
                                                className={
                                                    passwordStrength.score >= 3
                                                        ? "strength-active strong"
                                                        : ""
                                                }
                                            ></span>

                                        </div>

                                        <span
                                            className={`strength-label strength-${passwordStrength.score}`}
                                        >
                                            {passwordStrength.text}
                                        </span>

                                    </div>
                                )}

                            </div>


                            {/* =================================
                                CONFIRM PASSWORD
                            ================================= */}

                            <div className="register-field">

                                <label htmlFor="confirmPassword">
                                    Confirm password
                                </label>

                                <div
                                    className={`register-input-box ${
                                        formData.confirmPassword &&
                                        formData.password !==
                                            formData.confirmPassword
                                            ? "password-error"
                                            : ""
                                    }`}
                                >

                                    <i className="bi bi-lock-fill"></i>

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm your password"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        disabled={loading}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="register-eye"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        disabled={loading}
                                    >

                                        <i
                                            className={
                                                showConfirmPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>

                                    </button>

                                </div>


                                {formData.confirmPassword && (
                                    <div
                                        className={
                                            formData.password ===
                                            formData.confirmPassword
                                                ? "password-status matched"
                                                : "password-status not-matched"
                                        }
                                    >

                                        <i
                                            className={
                                                formData.password ===
                                                formData.confirmPassword
                                                    ? "bi bi-check-circle"
                                                    : "bi bi-x-circle"
                                            }
                                        ></i>

                                        <span>
                                            {formData.password ===
                                            formData.confirmPassword
                                                ? "Passwords match"
                                                : "Passwords do not match"}
                                        </span>

                                    </div>
                                )}

                            </div>


                            {/* =================================
                                TERMS
                            ================================= */}

                            <div className="register-terms">

                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) =>
                                        setAgreeTerms(
                                            e.target.checked
                                        )
                                    }
                                    disabled={loading}
                                />

                                <label htmlFor="terms">

                                    I agree to the{" "}

                                    <span>
                                        Terms & Conditions
                                    </span>

                                    {" "}and{" "}

                                    <span>
                                        Privacy Policy
                                    </span>

                                </label>

                            </div>


                            {/* =================================
                                SUBMIT
                            ================================= */}

                            <button
                                type="submit"
                                className="register-submit"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="register-spinner"></span>

                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account

                                        <i className="bi bi-arrow-right"></i>
                                    </>
                                )}

                            </button>


                            {/* =================================
                                LOGIN
                            ================================= */}

                            <div className="register-login-link">

                                Already have an account?

                                <Link to="/login">
                                    Sign in
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;