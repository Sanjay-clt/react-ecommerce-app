import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
  try {
    const res = await sendOtp(email);

    if (res.message && res.message.includes("OTP")) {
      navigate("/verify-otp", { state: { email } });
    } else {
      setError(res.message || "Failed to send OTP");
    }
  } catch {
    setError("Server error");
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSendOtp}>Send OTP</button>

        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}
