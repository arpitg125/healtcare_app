import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/analytics", label: "Analytics", icon: "📊" },
    { path: "/patients", label: "Patients", icon: "🏥" },
  ];

  const styles = {
    nav: {
      background: "linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },
    logo: {
      color: "white",
      fontWeight: 800,
      fontSize: "20px",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    links: {
      display: "flex",
      gap: "4px",
      alignItems: "center",
    },
    link: (isActive) => ({
      color: isActive ? "white" : "rgba(255,255,255,0.75)",
      textDecoration: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: isActive ? 700 : 500,
      background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }),
    right: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userChip: {
      background: "rgba(255,255,255,0.15)",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    logoutBtn: {
      background: "rgba(229,62,62,0.85)",
      color: "white",
      border: "none",
      padding: "7px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "13px",
      transition: "background 0.2s",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <span>🏥</span>
        <span>HealthCare Pro</span>
      </Link>

      <div style={styles.links} className="hide-mobile">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={styles.link(location.pathname === link.path)}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div style={styles.right}>
        <NotificationBell />
        <div style={styles.userChip} className="hide-mobile">
          <span>👤</span>
          <span>{user?.email?.split("@")[0] || "User"}</span>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
