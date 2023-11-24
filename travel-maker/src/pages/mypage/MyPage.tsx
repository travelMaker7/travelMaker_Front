import ProfileComponent from "@/components/mypage/ProfileComponent";
import MannerTemperatureBar from "@/components/mypage/MannerTemperatureBar";
import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import styled from "styled-components";
import React from "react";
import MyPageSidebar from "@/components/mypage/MyPageSideBar";

const MyPage: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <ProfileComponent />
        {/* <MannerTemperatureBar width="70%" /> */}
        <ScheduleText>트레블 메이커와 함께해보세요!</ScheduleText>
        <MyPageSidebar />
      </Container>
    </>
  );
};

export default MyPage;

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
