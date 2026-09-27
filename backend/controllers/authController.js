const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

/* =========================================================
   HELPER FUNCTION - GENERATE JWT
========================================================= */

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || "7d",
        }
    );
};


/* =========================================================
   GOOGLE LOGIN
========================================================= */

const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required",
            });
        }

        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const email = payload.email?.toLowerCase();
        const name = payload.name;

        if (!email) {
            return res.status(400).json({
                message: "Google account email not available",
            });
        }

        // Find existing user
        let user = await User.findOne({ email });

        // Create account if user doesn't exist
        if (!user) {

            // Generate a random password because Google
            // authentication does not require a normal password.
            const randomPassword = await bcrypt.hash(
                `${googleId}-${Date.now()}`,
                10
            );

            user = await User.create({
                name: name || "Google User",
                email,
                password: randomPassword,
                role: "user",
            });
        }

        // Generate JWT
        const token = generateToken(user);

        return res.status(200).json({
            message: "Google login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        console.error("Google login error:", error);

        return res.status(401).json({
            message: "Google authentication failed",
        });
    }
};


/* =========================================================
   REGISTER USER
========================================================= */

const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            role,
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Validate role
        const selectedRole = role || "user";

        if (!["user", "admin"].includes(selectedRole)) {
            return res.status(400).json({
                message: "Invalid role. Role must be user or admin.",
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: selectedRole,
        });

        return res.status(201).json({

            message: "User registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        return res.status(500).json({
            message: "Server error during registration",
        });
    }
};


/* =========================================================
   LOGIN USER
========================================================= */

const loginUser = async (req, res) => {
    try {

        const {
            email,
            password,
            role,
        } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Normalize email
        const normalizedEmail = email
            .trim()
            .toLowerCase();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Check selected role
        if (role && user.role !== role) {

            return res.status(403).json({
                message:
                    `This account is registered as ${user.role}, not ${role}.`,
            });
        }

        // Compare password
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = generateToken(user);

        // Send response
        return res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message: "Server error during login",
        });
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
};