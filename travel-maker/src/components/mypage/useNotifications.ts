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
    const { data } = await axios.get("https://sosak.store/api/v1/accompany", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.notifications;
  });
};
