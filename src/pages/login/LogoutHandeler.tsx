// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const handleLogout = async () => {
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem('access_token');
//   console.log("Access Token:", accessToken);
// //     try {
// //       await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
// //       });
// //       localStorage.removeItem('access_token');
// //       window.location.href = '/'; // 홈페이지로 리디렉트
// //     } catch (error) {
// //       console.error('로그아웃 에러', error);
// //     }
// //   };

// //   const LogoutHandler: React.FC = () => {
// //   return (
// //     <button onClick={handleLogout}>로그아웃</button>
// //   );
// // };
// if (!accessToken) {
//     console.error('로그아웃 실패: 토큰이 존재하지 않습니다.');
//     return;
//   }
// try {
    

//     const response = await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + accessToken
//       }
//     });

//     if (response.status === 200) {
//       localStorage.removeItem('access_token');
//       console.log('로그아웃 성공');
//       navigate('/');
//     }
//   } catch (error) {
//     console.error('로그아웃 에러', error);
//   }
// };
// const LogoutHandler: React.FC = () => {
//        return (
//          <button onClick={handleLogout}>로그아웃</button>
//       );
//      };


// export default LogoutHandler;


import React from 'react';
// import { handleLogout } from './logoutFunction'; onclick없애놓음


 const LogoutHandler: React.FC = () => {
  return (
    <button>로그아웃</button>
    );
     };

    
export default LogoutHandler;
    
