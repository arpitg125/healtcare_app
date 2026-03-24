import { useAuth } from "../context/AuthContext";
import { usePatients } from "../context/PatientContext";
import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { patients } = usePatients();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const stats = {
    total: patients.length,
    critical: patients.filter((p) => p.status === "Critical").length,
    stable: patients.filter((p) => p.status === "Stable").length,
    recovering: patients.filter((p) => p.status === "Recovering").length,
  };

  const statCards = [
    {
      label: "Total Patients",
      value: stats.total,
      icon: "👥",
      color: "#3182ce",
      bg: "#ebf8ff",
    },
    {
      label: "Critical",
      value: stats.critical,
      icon: "🚨",
      color: "#e53e3e",
      bg: "#fff5f5",
    },
    {
      label: "Stable",
      value: stats.stable,
      icon: "✅",
      color: "#38a169",
      bg: "#f0fff4",
    },
    {
      label: "Recovering",
      value: stats.recovering,
      icon: "🔄",
      color: "#d69e2e",
      bg: "#fffff0",
    },
  ];

  const recentPatients = [...patients]
    .sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
    .slice(0, 5);

  const handleTestNotification = () => {
    addNotification(
      "🚨 Critical Alert",
      "Patient Mohammed Rafiq needs immediate attention in Ward 3.",
      "critical",
    );
  };

  const styles = {
    page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
    welcome: {
      background: "linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)",
      borderRadius: "16px",
      padding: "28px 32px",
      color: "white",
      marginBottom: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    statCard: (bg, color) => ({
      background: bg,
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      cursor: "pointer",
    }),
    statIcon: (color) => ({
      width: "56px",
      height: "56px",
      borderRadius: "12px",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      color: "white",
    }),
    grid2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "20px",
    },
    tableRow: (i) => ({
      padding: "12px 0",
      borderBottom: i < 4 ? "1px solid #f0f4f8" : "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    }),
  };

  return (
    <div style={styles.page} className="fade-in">
      {/* Welcome Banner */}
      <div style={styles.welcome}>
        <div>
          <h1
            style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px" }}
          >
            Welcome back, {user?.email?.split("@")[0] || "Doctor"} 👋
          </h1>
          <p style={{ opacity: 0.85, fontSize: "15px" }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="btn"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
            onClick={handleTestNotification}
          >
            🔔 Test Notification
          </button>
          <button
            className="btn"
            style={{ background: "white", color: "#2b6cb0" }}
            onClick={() => navigate("/patients")}
          >
            View All Patients
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {statCards.map((s) => (
          <div
            key={s.label}
            style={styles.statCard(s.bg, s.color)}
            className="card"
            onClick={() => navigate("/patients")}
          >
            <div style={styles.statIcon(s.color)}>{s.icon}</div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: 800, color: s.color }}>
                {s.value}
              </p>
              <p style={{ fontSize: "13px", color: "#718096" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.grid2}>
        {/* Recent Patients */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: "17px" }}>
              Recent Patients
            </h2>
            <button
              className="btn btn-outline"
              style={{ padding: "6px 12px", fontSize: "12px" }}
              onClick={() => navigate("/patients")}
            >
              View All
            </button>
          </div>
          {recentPatients.map((p, i) => (
            <div
              key={p.id}
              style={styles.tableRow(i)}
              onClick={() => {
                navigate(`/patients/${p.id}`);
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#3182ce",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  {p.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "14px" }}>{p.name}</p>
                  <p style={{ fontSize: "12px", color: "#718096" }}>
                    {p.condition}
                  </p>
                </div>
              </div>
              <span
                className={`status-badge ${p.status === "Stable" ? "status-stable" : p.status === "Critical" ? "status-critical" : "status-recovering"}`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card" style={{ marginBottom: "16px" }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "17px",
                marginBottom: "14px",
              }}
            >
              Quick Actions
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {[
                { icon: "🏥", label: "Patients", path: "/patients" },
                { icon: "📊", label: "Analytics", path: "/analytics" },
                { icon: "🔔", label: "Alerts", action: handleTestNotification },
                { icon: "👤", label: "Profile", action: null },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.path ? () => navigate(a.path) : a.action}
                  style={{
                    background: "#f7fafc",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "16px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                    fontWeight: 600,
                    color: "#2d3748",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>
                    {a.icon}
                  </div>
                  <div style={{ fontSize: "13px" }}>{a.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div
            className="card"
            style={{ background: "linear-gradient(135deg, #f0fff4, #c6f6d5)" }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: "8px" }}>
              📋 Today's Summary
            </h3>
            <p
              style={{ fontSize: "13px", color: "#4a5568", lineHeight: "1.6" }}
            >
              {stats.critical} critical patient{stats.critical !== 1 ? "s" : ""}{" "}
              need{stats.critical === 1 ? "s" : ""} attention.
              {stats.stable} patients are stable. {stats.recovering} are in
              recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
