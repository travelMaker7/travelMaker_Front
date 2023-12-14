import React from 'react';
import styled from 'styled-components';
import kakaologin from "../../assets/images/login/kakaologinlargewide.png";
import TopBar from "../../components/main/TopBar";
import bus from "../../assets/images/login/bus.png";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;  
  height: 57vh; 
  background-color: white;
  border: 1px solid #b0b3b3fa;
  margin: auto; 
  position: relative; 
  top: 80px; 
`;

const Title1 = styled.h1`
  margin-bottom: 30px;
  color: #9BC9FF;
  font-size:15px; 
`;

const Title2 = styled.h1`
  margin-bottom: 20px;
  color: #9BC9FF;
  font-size: 25px;
`;
const ChaImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const LoginBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FEE500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const KakaoLoginImg = styled.img`
  width: 300px;
  height: 45px;
`;


const SignupLink = styled.a`
  text-decoration: none;
  color: #b0b3b3fa;
  font-weight:bold;
  border-bottom:1px solid #b0b3b3fa;
`;

const Login: React.FC = () => {
  const KAKAO_REST_API_KEY = import.meta.env.KAKAO_REST_API_KEY;
  const KAKAO_REST_API_KEY2 = process.env.KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.KAKAO_REDIRECT_URI;
  console.log("KAKAO_REST_API_KEY", KAKAO_REST_API_KEY)
  console.log("KAKAO_REST_API_KEY2", KAKAO_REST_API_KEY2)
  console.log("KAKAO_REDIRECT_URI", KAKAO_REDIRECT_URI)
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;


  const loginWithKakao = () => {
    window.location.href = link;
  };

  
  return (
    <>
    <TopBar />
    <LoginContainer>
      <Title1>나랑 꼭 맞는 상대와 여행하고 싶다</Title1>
      <ChaImage src={bus} alt="image" />
      <Title2>그럴땐 트레블메이커로</Title2>
      <LoginBox onClick={loginWithKakao}>
        <KakaoLoginImg src={kakaologin} alt="Login with Kakao" />
      </LoginBox>
      <p>아직 계정이 없으신가요? <SignupLink href="/signup">회원가입</SignupLink></p>
    </LoginContainer>
    </>
  );
}

export default Login;