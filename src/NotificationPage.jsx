import React from "react";
import "./NotificationPage.css";

function NotificationPage({ notifications }) {
  return (
    <div className="notification-page">
      <h2>My Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications available 🔕</p>
      ) : (
        notifications.map((note, index) => (
          <div className="notification-card" key={index}>
            🔔 {note.message}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationPage;
