import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthCard from "@/components/auth/AuthCard";
import AuthShell from "@/components/auth/AuthShell";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/features/auth/authSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(forgotPassword({ email }));

    if (forgotPassword.fulfilled.match(result)) {
      navigate("/reset-password");
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Forgot password"
        subtitle="Enter your email. We will send a reset OTP code."
      >
        <form className="form" onSubmit={submitHandler}>
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button disabled={loading}>
            {loading ? "Sending OTP..." : "Send reset OTP"}
          </Button>

          <Alert type="error" message={error} />
          <Alert type="success" message={message} />

          <p>
            Remember password?{" "}
            <Link className="auth-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}