// // components/Notification.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AcceptOrDecline from "./AcceptOrDecline";
// import { Notifications } from "@/utils/Types";

// const Notification: React.FC = () => {
//   const [notifications, setNotifications] = useState<Notifications[]>([]);

//   useEffect(() => {
//     const polling = setInterval(async () => {
//       try {
//         const response = await axios.get("/api/v1/accompany ", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (response.data && response.data.notifications) {
//           setNotifications(response.data.notifications);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }, 5000);

//     return () => clearInterval(polling);
//   }, []);

//   if (!notifications) return null;

//   return (
//     <div>
//       {notifications.map((notification) => (
//         <div key={notification.joinId}>
//           <p>
//             {notification.nickname} {notification.scheduleName} -{" "}
//             {notification.destinationName} 동행신청
//           </p>
//           <AcceptOrDecline joinId={notification.joinId} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notification;
