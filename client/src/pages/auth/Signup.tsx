import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(signup(form));

    if (signup.fulfilled.match(result)) {
      navigate("/verify-otp");
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Create account"
        subtitle="Start your secure note workspace with email OTP verification."
      >
        <form className="form" onSubmit={submitHandler}>
          <Input
            label="Full name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Password"
            placeholder="Minimum 6 characters"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <Alert type="error" message={error} />
          <Alert type="success" message={message} />

          <p>
            Already have an account?{" "}
            <Link className="auth-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}