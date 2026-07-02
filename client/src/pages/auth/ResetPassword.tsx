import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthCard from "@/components/auth/AuthCard";
import AuthShell from "@/components/auth/AuthShell";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/features/auth/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { emailForOtp, loading, error, message } = useAppSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForOtp) {
      alert("Email not found. Please try forgot password again.");
      return;
    }

    const result = await dispatch(
      resetPassword({
        email: emailForOtp,
        otp: form.otp,
        newPassword: form.newPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Reset password"
        subtitle={`Enter OTP sent to ${emailForOtp || "your email"}.`}
      >
        <form className="form" onSubmit={submitHandler}>
          <Input
            label="OTP Code"
            placeholder="Enter 6 digit OTP"
            value={form.otp}
            maxLength={6}
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
          />

          <Input
            label="New password"
            placeholder="Enter new password"
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />

          <Button disabled={loading}>
            {loading ? "Resetting..." : "Reset password"}
          </Button>

          <Alert type="error" message={error} />
          <Alert type="success" message={message} />

          <p>
            Go back to{" "}
            <Link className="auth-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}