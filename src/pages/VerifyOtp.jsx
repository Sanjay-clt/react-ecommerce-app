import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/authApi";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // ✅ Redirect SAFELY after render
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    try {
      const res = await verifyOtp(email, otp);

      if (res.token) {
        localStorage.setItem("resetToken", res.token);
        navigate("/reset-password");
      } else {
        alert(res.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  // Prevent rendering until email exists
  if (!email) return null;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}
