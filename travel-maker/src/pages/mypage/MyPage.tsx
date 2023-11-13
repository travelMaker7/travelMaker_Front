import MannerTemperatureBar from "@/components/mypage/MannerTemperatureBar";
import ProfileComponent from "@/components/mypage/ProfileComponent";
import ScheduleTabs from "@/components/mypage/ScheduleTabs";
import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import styled from "styled-components";
import React from "react";

const MyPage: React.FC = () => {
  return (
    <Container>
      <HeaderComponent />
      <ProfileComponent />
      <MannerTemperatureBar width="70%" />

      <ScheduleTabs />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  background-color: #fff;
  height: 100vh;
  padding: 40px;
  flex-direction: column;
  margin: 0 25%;
`;