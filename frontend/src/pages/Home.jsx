import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="atm-home">

      {/* ==========================================
          HERO SECTION
          ========================================== */}

      <section id="home" className="atm-hero">

        <div className="container">
          <div className="row align-items-center g-5">

            {/* Left Content */}
            <div className="col-lg-6">

              <div className="atm-hero-badge">
                <span className="pulse-dot"></span>
                AI-Powered ATM Cash Availability Prediction & Smart ATM Locator
              </div>

              <h1 className="atm-hero-title">
                Find the Right ATM
                <span> Before You Visit.</span>
              </h1>

              <p className="atm-hero-text">
                Our intelligent ATM system predicts cash availability
                and helps you locate suitable ATMs, so you can save time
                and avoid unnecessary trips.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">

                <Link
                  to="/login"
                  className="btn atm-primary-btn btn-lg"
                >
                  Find an ATM
                  <span>→</span>
                </Link>

                <button
                  className="btn atm-outline-btn btn-lg"
                  onClick={() => scrollToSection('about')}
                >
                  Explore More
                </button>

              </div>

              {/* Mini stats */}
              <div className="row mt-5 g-3">

                <div className="col-6 col-sm-4">
                  <div className="hero-stat">
                    <strong>AI</strong>
                    <span>Prediction</span>
                  </div>
                </div>

                <div className="col-6 col-sm-4">
                  <div className="hero-stat">
                    <strong>Smart</strong>
                    <span>Locator</span>
                  </div>
                </div>

                <div className="col-6 col-sm-4">
                  <div className="hero-stat">
                    <strong>24/7</strong>
                    <span>Access</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right ATM Visual */}
            <div className="col-lg-6">

              <div className="atm-hero-visual">

                <div className="hero-glow"></div>

                <div className="atm-machine">

                  <div className="atm-top">
                    <div className="atm-screen">
                      <div className="screen-logo">
                        ATM <span>SMART</span>
                      </div>

                      <div className="screen-line"></div>

                      <div className="screen-status">
                        <span></span>
                        System Active
                      </div>
                    </div>
                  </div>

                  <div className="atm-keypad">

                    <div className="atm-slot"></div>

                    <div className="keypad-grid">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>

                  </div>

                  <div className="atm-card-slot">
                    CARD
                  </div>

                </div>

                {/* Floating prediction card */}
                <div className="prediction-float-card">
                  <div className="prediction-icon">
                    ✓
                  </div>

                  <div>
                    <small>Prediction Status</small>
                    <strong>Cash Available</strong>
                  </div>
                </div>

                {/* Floating location card */}
                <div className="location-float-card">
                  <div className="location-icon">
                    ●
                  </div>

                  <div>
                    <small>Nearby ATM</small>
                    <strong>1.2 km away</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>


      {/* ==========================================
          TRUST / STATUS STRIP
          ========================================== */}

      <section className="atm-status-section">

        <div className="container">

          <div className="row text-center g-4">

            <div className="col-md-4">
              <div className="status-item">
                <div className="status-icon blue">✓</div>
                <div>
                  <strong>Smart Predictions</strong>
                  <p>Data-driven ATM insights</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="status-item">
                <div className="status-icon green">⌖</div>
                <div>
                  <strong>Smart Location</strong>
                  <p>Find suitable nearby ATMs</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="status-item">
                <div className="status-icon purple">AI</div>
                <div>
                  <strong>AI Powered</strong>
                  <p>Intelligent cash prediction</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          ABOUT SECTION
          ========================================== */}

      <section id="about" className="atm-section atm-about-section">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <div className="section-label">
                ABOUT OUR PROJECT
              </div>

              <h2 className="section-title">
                Smarter ATM decisions,
                <span> powered by AI.</span>
              </h2>

              <p className="section-text">
                ATM Smart is an AI-powered platform designed to help
                users make better decisions when looking for cash.
              </p>

              <p className="section-text">
                Instead of visiting multiple ATMs and discovering that
                cash is unavailable, users can use our system to identify
                suitable ATMs based on predicted cash availability.
              </p>

              <div className="row g-3 mt-3">

                <div className="col-sm-6">
                  <div className="about-point">
                    <div>✓</div>
                    <span>AI-based prediction</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="about-point">
                    <div>✓</div>
                    <span>Smart ATM locator</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="about-point">
                    <div>✓</div>
                    <span>Data-driven insights</span>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="about-point">
                    <div>✓</div>
                    <span>User-friendly design</span>
                  </div>
                </div>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="about-visual">

                <div className="about-main-card">

                  <div className="about-card-header">
                    <div className="about-card-icon">
                      AI
                    </div>

                    <div>
                      <small>ATM Smart</small>
                      <strong>Prediction Engine</strong>
                    </div>
                  </div>

                  <div className="prediction-bars">

                    <div className="prediction-row">
                      <span>Cash Availability</span>
                      <div className="bar">
                        <div style={{ width: '88%' }}></div>
                      </div>
                      <strong>High</strong>
                    </div>

                    <div className="prediction-row">
                      <span>ATM Accessibility</span>
                      <div className="bar">
                        <div style={{ width: '76%' }}></div>
                      </div>
                      <strong>Good</strong>
                    </div>

                    <div className="prediction-row">
                      <span>Location Match</span>
                      <div className="bar">
                        <div style={{ width: '92%' }}></div>
                      </div>
                      <strong>Excellent</strong>
                    </div>

                  </div>

                </div>

                <div className="about-small-card">
                  <span>●</span>
                  Smart ATM Location
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          FEATURES
          ========================================== */}

      <section className="atm-section atm-features-section">

        <div className="container">

          <div className="text-center mb-5">

            <div className="section-label">
              FEATURES
            </div>

            <h2 className="section-title">
              Everything you need for a
              <span> smarter cash experience.</span>
            </h2>

            <p className="section-subtitle">
              Designed to make finding and choosing an ATM easier.
            </p>

          </div>


          <div className="row g-4">

            {/* Feature 1 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon blue-icon">
                  $
                </div>

                <h4>Cash Availability</h4>

                <p>
                  Check predicted cash availability before
                  visiting an ATM.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>


            {/* Feature 2 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon green-icon">
                  ⌖
                </div>

                <h4>Smart ATM Locator</h4>

                <p>
                  Find nearby ATMs and identify suitable
                  machines based on your needs.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>


            {/* Feature 3 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon purple-icon">
                  AI
                </div>

                <h4>AI Prediction</h4>

                <p>
                  Use intelligent models to predict ATM
                  cash availability.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>


            {/* Feature 4 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon orange-icon">
                  ◉
                </div>

                <h4>Location Assistance</h4>

                <p>
                  Quickly identify ATMs that are convenient
                  for your location.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>


            {/* Feature 5 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon cyan-icon">
                  ↗
                </div>

                <h4>Data Insights</h4>

                <p>
                  Understand prediction results through
                  simple and clear information.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>


            {/* Feature 6 */}
            <div className="col-md-6 col-lg-4">

              <div className="card atm-feature-card h-100">

                <div className="feature-icon dark-icon">
                  ✓
                </div>

                <h4>Secure Access</h4>

                <p>
                  Secure authentication protects your
                  account and personal information.
                </p>

                <span className="feature-arrow">→</span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          HOW IT WORKS
          ========================================== */}

      <section className="atm-section atm-how-section">

        <div className="container">

          <div className="text-center mb-5">

            <div className="section-label">
              HOW IT WORKS
            </div>

            <h2 className="section-title">
              Simple steps.
              <span> Smarter decisions.</span>
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-md-6 col-lg-3">
              <div className="how-card">

                <div className="step-number">01</div>

                <div className="how-icon">→</div>

                <h4>Login</h4>

                <p>
                  Create an account or securely log in
                  to access ATM Smart.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg-3">
              <div className="how-card">

                <div className="step-number">02</div>

                <div className="how-icon">⌖</div>

                <h4>Locate an ATM</h4>

                <p>
                  Search for ATMs that are convenient
                  for your location.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg-3">
              <div className="how-card">

                <div className="step-number">03</div>

                <div className="how-icon">AI</div>

                <h4>View Prediction</h4>

                <p>
                  Check the predicted cash availability
                  of the selected ATM.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg-3">
              <div className="how-card">

                <div className="step-number">04</div>

                <div className="how-icon">✓</div>

                <h4>Visit ATM</h4>

                <p>
                  Choose a suitable ATM and save
                  unnecessary trips.
                </p>

              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          CONTACT
          ========================================== */}

      <section id="contact" className="atm-section atm-contact-section">

        <div className="container">

          <div className="row g-5 align-items-center">

            <div className="col-lg-5">

              <div className="section-label">
                CONTACT
              </div>

              <h2 className="section-title">
                Have questions?
                <span> We'd love to hear from you.</span>
              </h2>

              <p className="section-text">
                If you have questions about ATM Smart,
                our prediction system, or the project,
                feel free to get in touch.
              </p>

              <div className="contact-info">

                <div className="contact-info-item">
                  <div className="contact-icon">✉</div>
                  <div>
                    <small>Email</small>
                    <strong>support@atmsmart.com</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">☎</div>
                  <div>
                    <small>Phone</small>
                    <strong>+91 90000 00000</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">⌖</div>
                  <div>
                    <small>Location</small>
                    <strong>India</strong>
                  </div>
                </div>

              </div>

            </div>


            <div className="col-lg-7">

              <div className="card contact-form-card">

                <h3>Send us a message</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! Your message has been received.');
                    e.target.reset();
                  }}
                >

                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="form-label">
                        Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="col-12">

                      <label className="form-label">
                        Subject
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="How can we help?"
                        required
                      />

                    </div>

                    <div className="col-12">

                      <label className="form-label">
                        Message
                      </label>

                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write your message..."
                        required
                      ></textarea>

                    </div>

                    <div className="col-12">

                      <button
                        type="submit"
                        className="btn atm-primary-btn"
                      >
                        Send Message →
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          FOOTER
          ========================================== */}

{/* ==========================================
    PROFESSIONAL FOOTER
    ========================================== */}

<footer className="atm-footer">

  <div className="container">

    {/* ================================
        FOOTER MAIN CONTENT
    ================================= */}

    <div className="row g-5">

      {/* ================================
          BRAND / ABOUT
      ================================= */}

      <div className="col-lg-4 col-md-6">

        <div className="footer-brand">

          <div className="footer-brand-icon">
            <i className="bi bi-credit-card-2-front"></i>
          </div>

          <span>
            ATM<span>Smart</span>
          </span>

        </div>

        <p className="footer-description">
          AI-powered ATM cash availability prediction
          and smart ATM location assistance designed
          to help you find the right ATM before you visit.
        </p>


        

      </div>


      {/* ================================
          QUICK LINKS
      ================================= */}

      <div className="col-6 col-md-3 col-lg-2">

        <div className="footer-column">

          <h5>Quick Links</h5>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>


      {/* ================================
          FEATURES
      ================================= */}

      <div className="col-6 col-md-3 col-lg-3">

        <div className="footer-column">

          <h5>Our Features</h5>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            <i className="bi bi-graph-up-arrow"></i>
            AI Cash Prediction
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            <i className="bi bi-geo-alt"></i>
            Smart ATM Locator
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            <i className="bi bi-bar-chart"></i>
            Data Insights
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
          >
            <i className="bi bi-shield-check"></i>
            Secure Access
          </button>

        </div>

      </div>


      {/* ================================
          SUPPORT
      ================================= */}

      <div className="col-lg-3 col-md-6">

        <div className="footer-column footer-support">

          <h5>Get In Touch</h5>

          <p className="footer-support-text">
            Have questions about ATM Smart?
            Our team is here to help.
          </p>


          <div className="footer-contact-item">

            <div className="footer-contact-icon">
              <i className="bi bi-envelope"></i>
            </div>

            <div>
              <small>Email</small>
              <span>support@atmsmart.com</span>
            </div>

          </div>


          <div className="footer-contact-item">

            <div className="footer-contact-icon">
              <i className="bi bi-telephone"></i>
            </div>

            <div>
              <small>Phone</small>
              <span>+91 90000 00000</span>
            </div>

          </div>


          <div className="footer-contact-item">

            <div className="footer-contact-icon">
              <i className="bi bi-geo-alt"></i>
            </div>

            <div>
              <small>Location</small>
              <span>India</span>
            </div>

          </div>

        </div>

      </div>

    </div>


    {/* ================================
        NEWSLETTER
    ================================= */}

    


    {/* ================================
        FOOTER DIVIDER
    ================================= */}

    <div className="footer-divider"></div>


    {/* ================================
        FOOTER BOTTOM
    ================================= */}

    <div className="footer-bottom">

      <div className="footer-copyright">

        <span>
          © 2026 <strong>ATMSmart</strong>. All rights reserved.
        </span>

      </div>


      <div className="footer-legal">

        <button
          type="button"
          onClick={() =>
            alert("Privacy Policy information will be available soon.")
          }
        >
          Privacy Policy
        </button>

        <button
          type="button"
          onClick={() =>
            alert("Terms & Conditions information will be available soon.")
          }
        >
          Terms & Conditions
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
        >
          Help & Support
        </button>

      </div>


      <div className="footer-tagline">

        <i className="bi bi-stars"></i>

        Smart ATM Decisions, Powered by AI.

      </div>

    </div>


    {/* ================================
        BACK TO TOP
    ================================= */}

    <button
      type="button"
      className="footer-back-to-top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>

  </div>

</footer>

    </div>
  );
};

export default Home;