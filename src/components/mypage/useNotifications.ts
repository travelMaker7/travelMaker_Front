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
  return useQuery<NotificationData[], Error>(
    "notifications",
    async () => {
      const { data } = await axios.get("https://sosak.store/api/v1/accompany", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log("data11", data.data.notifications);
      return data.data.notifications;
    },
    {
      refetchInterval: 5000,
    }
  );
};
