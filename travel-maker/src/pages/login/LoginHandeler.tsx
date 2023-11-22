import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// API 기본 URL을 설정합니다.
const API_BASE_URL = 'http://121.178.106.179:8080';

interface KakaoResponse {
  accessToken: string;
}

const LoginHandeler: React.FC = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      if (!code) {
        console.error('인증 코드가 없습니다.');
        navigate('/login');
        return;
      }

    //   try {
    //     const response = await axios.get<KakaoResponse>(`/api/v1/auth/kakao?code=${code}`, {
    //       headers: {
    //         "Content-Type": "application/json;charset=utf-8",
    //       },
    //     });

    //     console.log(response.data);
    //     // localStorage.setItem('token', response.data.accessToken);
    //     navigate('/');
    //   } catch (error) {
    //     console.error('로그인 에러', error);
    //     window.alert('로그인에 실패했습니다.');
    //     navigate('/login');
    //   }
    // };

    try {
      const response = await axios.get<KakaoResponse>(`${API_BASE_URL}/api/v1/auth/kakao?code=${code}`, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      // 상태 코드와 응답 데이터를 콘솔에 출력합니다.
      console.log("HTTP 상태 코드:", response.status);
      console.log(response.data);

      // localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error('로그인 에러', error);
      window.alert('로그인에 실패했습니다.');
      navigate('/login');
    }
  };

    kakaoLogin();
  }, [code, navigate]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다...</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandeler;

  




