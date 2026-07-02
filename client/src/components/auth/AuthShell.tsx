import React from "react";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <div className="auth-hero-overlay" />

        <div className="auth-hero-content">
          <div className="brand-pill">Premium Secure Notes App</div>

          <div>
            <h1 className="auth-title">
              Capture ideas with{" "}
              <span className="auth-gradient">beautiful security.</span>
            </h1>

            <p className="auth-subtitle">
              Create notes, protect your account with email OTP verification,
              and manage your ideas in a clean premium dashboard.
            </p>
          </div>

          <div className="auth-stats">
            <div className="stat-card">
              <span className="stat-number">6 Digit</span>
              <span className="stat-label">Email OTP</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">JWT</span>
              <span className="stat-label">Protected Notes</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">CRUD</span>
              <span className="stat-label">Full Note System</span>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel">{children}</section>
    </main>
  );
}