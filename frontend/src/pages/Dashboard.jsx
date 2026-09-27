import React from 'react';
import './Dashboard.css';

/**
 * Dashboard Page Component (Placeholder UI)
 * Strictly displays a welcome greeting and placeholder notice without simulated data.
 */
const Dashboard = () => {
    return (
        <div className="page-wrapper">
            <div className="glass-card dashboard-placeholder-card">
                <div className="dashboard-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M6 12h.01M18 12h.01" />
                    </svg>
                </div>
                <h1 className="dashboard-title">Welcome to ATM Smart</h1>
                <p className="dashboard-message">
                    The ATM cash availability prediction dashboard and locator tools will be available after authentication and backend API integration.
                </p>
                <div className="dashboard-status-tag">
                    <span className="status-dot"></span>
                    System Ready for Backend Integration
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
