// import axios from "axios";
// import React from "react";

// interface AcceptOrDeclineProps {
//   joinId: number;
// }

// const AcceptOrDecline: React.FC<AcceptOrDeclineProps> = ({ joinId }) => {
//   const handleResponse = async (status: string) => {
//     try {
//       const response = await axios.post("/api/v1/accompany/host ", {
//         joinId,
//         joinStatus: status,
//       });

//       if (response.status === 201) {
//         alert(response.data.message);
//       } else {
//         alert("처리 중 오류 발생");
//       }
//     } catch (error) {
//       alert("에러 발생");
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => handleResponse("신청수락")}>수락</button>
//       <button onClick={() => handleResponse("신청거절")}>거절</button>
//     </div>
//   );
// };

// export default AcceptOrDecline;
