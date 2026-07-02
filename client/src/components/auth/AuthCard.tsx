import React from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  );
}