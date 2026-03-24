import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationBell() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
    requestPermission,
    addNotification,
  } = useNotifications();
  const [open, setOpen] = useState(false);
  const [permGranted, setPermGranted] = useState(false);

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    setPermGranted(granted);
    if (granted) {
      addNotification(
        "Notifications Enabled",
        "You will now receive healthcare alerts.",
        "success",
      );
    }
  };

  const typeColors = {
    critical: "#fed7d7",
    info: "#bee3f8",
    success: "#c6f6d5",
  };

  const typeIcons = { critical: "🚨", info: "ℹ️", success: "✅" };

  const styles = {
    wrapper: { position: "relative" },
    btn: {
      background: "rgba(255,255,255,0.15)",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "8px",
      fontSize: "20px",
      position: "relative",
      transition: "background 0.2s",
    },
    badge: {
      position: "absolute",
      top: "2px",
      right: "2px",
      background: "#e53e3e",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "10px",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    panel: {
      position: "absolute",
      top: "48px",
      right: 0,
      width: "340px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
      zIndex: 2000,
      overflow: "hidden",
      animation: "fadeIn 0.2s ease",
    },
    header: {
      padding: "16px",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#f7fafc",
    },
    item: (read, type) => ({
      padding: "12px 16px",
      borderBottom: "1px solid #f0f4f8",
      background: read ? "white" : typeColors[type] || "#bee3f8",
      cursor: "pointer",
      transition: "background 0.2s",
    }),
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.btn} onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
      </button>

      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <span style={{ fontWeight: 700, fontSize: "15px" }}>
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {!permGranted && (
                <button
                  onClick={handleRequestPermission}
                  style={{
                    fontSize: "11px",
                    cursor: "pointer",
                    background: "#3182ce",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 8px",
                  }}
                >
                  Enable
                </button>
              )}
              <button
                onClick={markAllRead}
                style={{
                  fontSize: "11px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "#3182ce",
                  fontWeight: 600,
                }}
              >
                Mark all read
              </button>
            </div>
          </div>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <p
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#718096",
                }}
              >
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={styles.item(n.read, n.type)}
                  onClick={() => markAsRead(n.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>
                      {typeIcons[n.type]}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontWeight: n.read ? 500 : 700,
                          fontSize: "13px",
                          marginBottom: "3px",
                        }}
                      >
                        {n.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#4a5568" }}>
                        {n.message}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#718096",
                          marginTop: "4px",
                        }}
                      >
                        {n.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
