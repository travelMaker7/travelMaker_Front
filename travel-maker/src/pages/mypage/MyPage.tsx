// import MannerTemperatureBar from "@/components/mypage/MannerTemperatureBar";
// import ProfileComponent from "@/components/mypage/ProfileComponent";
import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import styled from "styled-components";
import React from "react";
import MyPageSidebar from "@/components/mypage/MyPageSideBar";
// import MyPageProfile from "../../components/profile/mypageprofile/MyPageProfile";
import ProfileComponent from "@/components/profile/mypageprofile/ProfileComponent";

const MyPage: React.FC = () => {
  return (
    <Container>
      <HeaderComponent />
      {/* <MyPageProfile /> */}
      <ProfileComponent />
      {/* <MannerTemperatureBar width="70%" /> */}
    
      {/* <ScheduleTabs /> */}
      <MyPageSidebar />
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
