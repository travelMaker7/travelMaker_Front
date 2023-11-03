import React, { useState } from 'react';
import logo from "../../assets/images/mainpageimages/logo.png";  
import userIcon from "../../assets/images/mainpageimages/mypagelogo.png";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginLogoutClick = async () => {
    if (localStorage.getItem('access_token')) {  // 수정된 부분
      const access_token = localStorage.getItem('access_token');


      try {
        const response = await axios({
            method: "POST",
            url: "https://kapi.kakao.com/v1/user/logout",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        
        if(response.status === 200) {
            localStorage.removeItem('access_token');
            navigate('/');
            console.log('로그아웃 처리 완료'); 
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <TopBarDiv>
      <LogoImg src={logo} alt="Logo" />
      <Profile>
        <UserIcon src={userIcon} alt="User Icon" onClick={toggleMenu} />
        {isOpen && (
          <Menu>
            <MenuItem onClick={handleLoginLogoutClick}>
              {localStorage.getItem('access_token') ? '로그아웃' : '로그인'}
              </MenuItem>
            <MenuItem>회원가입</MenuItem>
            <MenuItem>마이페이지</MenuItem>
          </Menu>
        )}
      </Profile>
    </TopBarDiv>
  );
}
  
export default TopBar;