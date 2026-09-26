import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { registerUser } from '../services/api';
import './AuthPages.css';

/**
 * Register Page Component for ATM Smart
 */
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
        setLoading(true);

        const data = await registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        setMessage(data.message);

        // Clear form after successful registration
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

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
                    <h2>Create Account</h2>
                    <p>Join ATM Smart to locate cash-available ATMs effortlessly</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {message && <p className="success-message">{message}</p>}
{error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                   <Button type="submit" variant="primary" fullWidth size="lg">
    {loading ? 'Creating Account...' : 'Register'}
</Button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
