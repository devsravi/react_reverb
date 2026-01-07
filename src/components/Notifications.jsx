import { useEffect, useState } from "react";
import echo from "../lib/echo";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    echo.channel("notifications")
      .listen(".notification.sent", (e) => {
        console.log("EVENT RECEIVED", e);

        setNotifications((prev) => [e, ...prev]);
      });

    return () => {
      echo.leave("notifications");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Notifications</h2>

      {notifications.length === 0 && (
        <p>No notifications yet</p>
      )}

      {notifications.map((n, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{n.title}</strong>
          <p>{n.message}</p>
          <small>{n.time}</small>
        </div>
      ))}
    </div>
  );
}
