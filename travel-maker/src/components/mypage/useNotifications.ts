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
  // const mockNotifications: NotificationData[] = [
  //   {
  //     joinId: 1,
  //     scheduleName: "서울 여행",
  //     destinationName: "잠실 롯데월드",
  //     nickname: "퉁퉁이",
  //     joinStatus: "신청대기",
  //   },
  //   {
  //     joinId: 2,
  //     scheduleName: "일정2",
  //     destinationName: "목적지2",
  //     nickname: "닉네임2",
  //     joinStatus: "신청대기",
  //   },
  //   {
  //     joinId: 3,
  //     scheduleName: "일정2",
  //     destinationName: "목적지2",
  //     nickname: "닉네임2",
  //     joinStatus: "신청대기",
  //   },
  // ];

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
