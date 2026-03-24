import { createContext, useContext, useState, useCallback } from "react";
import {
  sendLocalNotification,
  requestNotificationPermission,
} from "../utils/serviceWorkerRegistration";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Critical Patient Alert",
      message: "Vikram Joshi's vitals need immediate attention.",
      time: "2 min ago",
      read: false,
      type: "critical",
    },
    {
      id: 2,
      title: "Appointment Reminder",
      message: "Dr. Priya Mehta has 3 appointments today.",
      time: "15 min ago",
      read: false,
      type: "info",
    },
    {
      id: 3,
      title: "Lab Results Ready",
      message: "Blood test results for Priya Nair are available.",
      time: "1 hr ago",
      read: true,
      type: "success",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback((title, message, type = "info") => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    sendLocalNotification(title, message, "/");
  }, []);

  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const requestPermission = () => requestNotificationPermission();

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllRead,
        requestPermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
