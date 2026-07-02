import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AuthCard from "@/components/auth/AuthCard";
import AuthShell from "@/components/auth/AuthShell";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      navigate("/notes");
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Welcome back"
        subtitle="Login to continue writing and managing your private notes."
      >
        <form className="form" onSubmit={submitHandler}>
          <Input
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Alert type="error" message={error} />

          <p>
            <Link className="auth-link" to="/forgot-password">
              Forgot password?
            </Link>
          </p>

          <p>
            New here?{" "}
            <Link className="auth-link" to="/signup">
              Create account
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}