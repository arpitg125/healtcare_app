export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg.scope);
        })
        .catch((err) => console.error("SW registration failed:", err));
    });
  }
}

export function sendLocalNotification(title, body, url = "/") {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SHOW_LOCAL_NOTIFICATION",
      payload: { title, body, url },
    });
  } else {
    // Fallback: browser Notification API
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/logo192.png" });
    }
  }
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
}
