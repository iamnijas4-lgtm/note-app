import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <textarea className="textarea-field" {...props} />
    </div>
  );
}