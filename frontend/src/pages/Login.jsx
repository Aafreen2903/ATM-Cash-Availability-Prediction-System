import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { loginUser } from '../services/api';
import './AuthPages.css';

/**
 * Login Page Component for ATM Smart
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {
            setLoading(true);

            const data = await loginUser({
                email,
                password
            });

            // Store JWT token
            localStorage.setItem('token', data.token);

            // Store user information
            localStorage.setItem('user', JSON.stringify(data.user));

            // Go to dashboard
            navigate('/dashboard');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="glass-card auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your ATM Smart dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="lg"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;