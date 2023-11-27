// // logoutFunction.ts
// import axios from 'axios';


// export const handleLogout = async (navigate) => {
//     // const navigate = useNavigate();

//     const accessToken = localStorage.getItem('access_token');
//     console.log("Access Token:", accessToken);


//     if (accessToken) {
//         try {
            
//             await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
//             });
//             localStorage.removeItem('access_token');
//             navigate('/'); // 홈페이지로 리디렉트
//         } catch (error) {
//             console.error('로그아웃 에러', error);
//         }
//     } else {
//         console.error('로그아웃 실패: accessToken이 없습니다.');
//     }
// };


import axios from 'axios';

export const handleLogout = async (navigate: (path: string) => void) => {
  const accessToken = localStorage.getItem('access_token');
  console.log("Access Token:", accessToken);

  if (accessToken) {
    try {
      await axios.post("https://sosak.store/api/v1/logout", {},{
        headers: {Authorization: `Bearer ${accessToken}`, 
                  "Content-Type" : "application/json"
              }
      });
      localStorage.removeItem('access_token');
      navigate('/'); // 홈페이지로 리디렉트
    } catch (error) {
      console.error('로그아웃 에러', error);
    }
  } else {
    console.error('로그아웃 실패: accessToken이 없습니다.');
  }
};
