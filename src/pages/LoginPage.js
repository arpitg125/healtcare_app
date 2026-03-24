import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login, authError, setAuthError, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setAuthError("");
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #3182ce 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    container: {
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
      animation: "fadeIn 0.4s ease",
    },
    header: { textAlign: "center", marginBottom: "32px" },
    icon: { fontSize: "48px", marginBottom: "12px" },
    title: {
      fontSize: "26px",
      fontWeight: 800,
      color: "#1a365d",
      marginBottom: "6px",
    },
    subtitle: { color: "#718096", fontSize: "14px" },
    passWrapper: { position: "relative" },
    showBtn: {
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#718096",
      fontSize: "18px",
    },
    hint: {
      background: "#ebf8ff",
      borderRadius: "8px",
      padding: "12px 14px",
      fontSize: "13px",
      color: "#2b6cb0",
      marginTop: "16px",
      border: "1px solid #bee3f8",
      lineHeight: "1.8",
    },
    fillBtn: {
      background: "none",
      border: "none",
      color: "#3182ce",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "13px",
      textDecoration: "underline",
      padding: 0,
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.icon}>🏥</div>
          <h1 style={styles.title}>HealthCare Pro</h1>
          <p style={styles.subtitle}>Sign in to access the platform</p>
        </div>

        {authError && <div className="alert alert-error">{authError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-input ${emailError ? "error" : ""}`}
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <p className="error-msg">⚠️ {emailError}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={styles.passWrapper}>
              <input
                type={showPass ? "text" : "password"}
                className={`form-input ${passwordError ? "error" : ""}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              <button
                type="button"
                style={styles.showBtn}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && <p className="error-msg">⚠️ {passwordError}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px",
              fontSize: "16px",
              marginTop: "8px",
            }}
          >
            {loading ? "⏳ Signing in..." : "🔐 Sign In"}
          </button>
        </form>

        <div style={styles.hint}>
          <strong>🔑 Demo Credentials:</strong>
          <br />
          📧 Email: <code>doctor@hospital.com</code>
          <br />
          🔒 Password: <code>password123</code>
          <br />
          <button
            style={styles.fillBtn}
            onClick={() => {
              setEmail("doctor@hospital.com");
              setPassword("password123");
            }}
          >
            ⚡ Auto-fill credentials
          </button>
        </div>
      </div>
    </div>
  );
}
