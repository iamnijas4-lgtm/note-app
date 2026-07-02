import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "@/features/auth/authSlice";
import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";


export default function VerifyOtp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { emailForOtp, loading, error, message } = useAppSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForOtp) {
      alert("Email not found. Please signup again.");
      return;
    }

    const result = await dispatch(
      verifyOtp({
        email: emailForOtp,
        otp,
      })
    );

    if (verifyOtp.fulfilled.match(result)) {
      navigate("/notes");
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Verify OTP"
        subtitle={`We sent a 6 digit verification code to ${
          emailForOtp || "your email"
        }.`}
      >
        <form className="form" onSubmit={submitHandler}>
          <Input
            label="OTP Code"
            placeholder="Enter 6 digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button disabled={loading}>
            {loading ? "Verifying..." : "Verify email"}
          </Button>

          <Alert type="error" message={error} />
          <Alert type="success" message={message} />
        </form>
      </AuthCard>
    </AuthShell>
  );
}