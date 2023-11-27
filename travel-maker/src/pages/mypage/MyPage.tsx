import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import styled from "styled-components";
import MyPageSidebar from "@/components/mypage/MyPageSideBar";
import ProfileComponent from "@/components/profile/mypageprofile/ProfileComponent";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 사용자 정보를 불러오는 함수
    const fetchUserInfo = async () => {
      try {
        // 카카오 API 또는 자체 백엔드 API 호출
        const response = await axios.get('https://sosak.store/api/v1/mypage/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setNickname(response.data.data.nickname); // 응답으로 받은 닉네임을 상태에 설정
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        // 에러 핸들링
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <HeaderComponent />
      <Container>
        <GreetingText>안녕하세요, {nickname}님!</GreetingText>
        <ProfileComponent />
        {/* <MannerTemperatureBar width="70%" /> */}
        <ScheduleText>트레블 메이커와 함께해보세요!</ScheduleText>
        <MyPageSidebar />
      </Container>
    </>
  );
};

export default MyPage;


// 스타일링 추가
const GreetingText = styled.div`
  font-size: 28px;
  color: #2c3e50;
  /* padding-left: 4rem; */
  /* margin-top: 3rem; */
  /* padding-bottom: 30px; */
  margin-bottom: 40px;
  align-self: flex-start; // 왼쪽 정렬
`;


const Container = styled.div`
  display: flex;
  background-color: #fff;
  height: 100vh;
  padding: 20px;
  flex-direction: column;
  margin: 0 5%;
`;

const ScheduleText = styled.div`
  display: flex;
  font-size: 28px;
  color: #2c3e50;
  padding-left: 4rem;
  margin-top: 3rem;
`;
