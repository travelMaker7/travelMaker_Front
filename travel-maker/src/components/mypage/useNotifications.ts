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
    const { data } = await axios.get("/api/v1/accompany");
    return data.notifications;
  });

  // return useQuery<NotificationData[], Error>("notifications", async () => {
  //   // Simulate an async operation, like fetching data
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(mockNotifications);
  //     }, 500); // Delay to simulate network request
  //   });
  // });
};
