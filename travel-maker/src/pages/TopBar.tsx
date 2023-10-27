import React, { useState } from 'react';
import logo from "../assets/images/mainpageimages/logo.png";  // 경로 수정
import userIcon from "../assets/images/mainpageimages/mypagelogo.png";  // 경로 수정
import styled from 'styled-components';

const TopBarDiv = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 1% 23%;
`;

const LogoImg = styled.img`
  width: 150px; 
  height: 30px;
`;

const UserIcon = styled.img`
  width: 50px;  
  height: 50px;  
  cursor: pointer;
`;

const Profile = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute; 
  top: 100%;  
  left: -24px;  
  width: 100px;  
  background-color: #97D2F2;
  z-index: 999;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  color: black;
  
  &:hover {
    background-color: lightgray;
  }
`;

const TopBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TopBarDiv>
      <LogoImg src={logo} alt="Logo" />
      <Profile>
        <UserIcon src={userIcon} alt="User Icon" onClick={toggleMenu} />
        {isOpen && (
          <Menu>
            <MenuItem>로그인</MenuItem>
            <MenuItem>회원가입</MenuItem>
            <MenuItem>마이페이지</MenuItem>
          </Menu>
        )}
      </Profile>
    </TopBarDiv>
  );
}
  
export default TopBar;