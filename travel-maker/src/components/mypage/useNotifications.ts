import { useQuery } from "react-query";
import axios from "axios";

export interface NotificationData {
  joinId: number;
  scheduleName: string;
  destinationName: string;
  nickname: string;
  joinStatus: string;
}

export const useNotifications = () => {
  return useQuery<NotificationData[], Error>("notifications", async () => {
    const { data } = await axios.get("/api/v1/accompany", {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    return data.notifications;
  });
};
