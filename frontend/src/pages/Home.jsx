import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

/**
 * Home Page Component for ATM Smart
 */
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-hero">
                {/* Badge */}
                <div className="hero-badge">
                    <span className="badge-pulse"></span>
                    Smart ATM Locator & Cash Prediction
                </div>

                {/* Project Name & Subtitle */}
                <h1 className="hero-title">
                    ATM <span className="text-gradient">Smart</span>
                </h1>
                <h2 className="hero-subtitle">
                    AI-Powered ATM Cash Availability Prediction & Smart ATM Locator
                </h2>

                {/* Description */}
                <p className="hero-description">
                    ATM Smart helps users quickly locate nearby ATMs based on predicted cash availability,
                    queue status, and operational health—saving time and ensuring reliable access to cash when needed.
                </p>

                {/* Action Buttons */}
                <div className="hero-actions">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/login')}
                    >
                        Login to Account
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => navigate('/register')}
                    >
                        Register Now
                    </Button>
                </div>

                {/* Feature Highlights Grid */}
                <div className="features-grid">
                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <h3>Cash Availability</h3>
                        <p>Smart prediction of cash levels to avoid visiting empty ATMs.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                            </svg>
                        </div>
                        <h3>Smart Locator</h3>
                        <p>Locate the nearest working ATM with optimized routing.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <h3>Real-time Insights</h3>
                        <p>Up-to-date operational status for hassle-free banking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
