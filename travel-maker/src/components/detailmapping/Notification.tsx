// components/Notification.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AcceptOrDecline from "./AcceptOrDecline";
import { Notifications } from "@/utils/Types";

const Notification: React.FC = () => {
  const [notification, setNotification] = useState<Notifications | null>(null);

  useEffect(() => {
    const polling = setInterval(async () => {
      try {
        const response = await axios.get("/api/v1/accompany ", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (
          response.data &&
          response.data.notifications &&
          response.data.notifications[0].joinId
        ) {
          setNotification(response.data.notifications[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(polling);
  }, []);

  if (!notification) return null;

  return (
    <div>
      <p>
        {notification.userName} {notification.scheduleName} -{" "}
        {notification.destinationName} 동행신청
      </p>
      <AcceptOrDecline joinId={notification.joinId} />
    </div>
  );
};

export default Notification;
