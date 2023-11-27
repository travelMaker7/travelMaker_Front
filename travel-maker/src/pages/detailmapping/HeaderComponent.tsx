// "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState, useContext } from 'react';
// import styled from "styled-components";
// import FilterSearch from "@/components/search/\bFilterSearch";
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import { useAuth } from '../../components/contexts/AuthContext'; 
// import {handleLogout}  from '../login/LogoutHandeler'
// import axios from 'axios';

// export const HeaderComponent: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false); // 토글 메뉴 상태
//   const navigate = useNavigate();
//   // const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const isLoggedIn = localStorage.getItem('access_token') != null;
//   const handleLogout = async () => {
//     try {
//       await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
//       });
//       localStorage.removeItem('access_token');
//       navigate('/');
//     } catch (error) {
//       console.error('로그아웃 에러', error);
//     }
//   };

//   const handleLoginLogoutClick = () => {
//     if (isLoggedIn) {
//       handleLogout();
//     } else {
//       navigate('/login'); // 로그인 페이지로 이동
//     }
//   };



//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

  
//  const navigateToMyPage = () => {
//   navigate('/mypage'); // 마이페이지 경로로 이동
// };



//   return (
//     <Header>
  
//       <Logo>travelMaker</Logo>
//       <SearchBoxContainer>
//         <FilterSearch/>
//       </SearchBoxContainer>
//       <UserIconContainer>
//       <UserIcon onClick={toggleMenu} />
//         {isOpen && (
//           <Menu>
//               <MenuItem onClick={handleLoginLogoutClick}>
//               {isLoggedIn ? '로그아웃' : '로그인'}
//               </MenuItem>
//             <MenuItem>회원가입</MenuItem>
//             <MenuItem onClick={navigateToMyPage}>마이페이지</MenuItem>
//           </Menu>
//         )}
//         </UserIconContainer>
//     </Header>
//   );
// };

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px 0;
//   margin-bottom: 40px;
//   /* border-bottom: 1px solid #8CC4F8; */
//   background-color: #00BFFF;
//   justify-content: space-around;
// `;
// const Logo = styled.h1`
//   color: #fff;
//   text-align: center;
//   font-family: "YourFontName", sans-serif;
//   font-size: 24px;
//   font-weight: bold;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
//   width: 10rem;
// `;

// const SearchBoxContainer = styled.div`
//   position: relative;
// `;

// const SearchBox = styled.input`
//   width: 300px;
//   height: 50px;
//   padding: 0 20px;
//   border-radius: 50px;
//   border: 2px solid var(--searchBlue, #8cc4f8);
//   /* border: none; */
//   box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
//   font-family: Inter;
// `;

// const SearchIcon = styled(FontAwesomeIcon)`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   /* transform: translateY(-50%); */
//   color: #8cc4f8;
//   cursor: pointer;
// `;

// const UserIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   cursor: pointer; 
//   background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 7.74194C23.9194 7.74194 27.0968 10.9194 27.0968 14.8387C27.0968 18.7581 23.9194 21.9355 20 21.9355C16.0806 21.9355 12.9032 18.7581 12.9032 14.8387C12.9032 10.9194 16.0806 7.74194 20 7.74194ZM20 35.4839C15.2661 35.4839 11.0242 33.3387 8.18548 29.9839C9.70161 27.129 12.6694 25.1613 16.129 25.1613C16.3226 25.1613 16.5161 25.1935 16.7016 25.25C17.75 25.5887 18.8468 25.8064 20 25.8064C21.1532 25.8064 22.2581 25.5887 23.2984 25.25C23.4839 25.1935 23.6774 25.1613 23.871 25.1613C27.3306 25.1613 30.2984 27.129 31.8145 29.9839C28.9758 33.3387 24.7339 35.4839 20 35.4839Z" fill="white"/></svg>');
// `;

// const Menu = styled.div`
//   position: absolute; 
//   top: 100%;  
//   left: -24px;  
//   width: 100px;  
//   background-color: #97D2F2;
//   z-index: 999;
// `;

// const MenuItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   font-size: 15px;
//   font-weight: bold;
//   color: black;
  
//   &:hover {
//     background-color: lightgray;
//   }
// `;

// const UserIconContainer = styled.div`
//   position: relative; /* 부모 컨테이너에 relative 설정 */
// `;

"@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import styled from "styled-components";
import FilterSearch from "@/components/search/\bFilterSearch";
import { useNavigate } from 'react-router-dom';
import {handleLogout}  from '../login/logoutFunction'


export const HeaderComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('access_token') != null;


  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      handleLogout(navigate);
         // 로그아웃 후 홈으로 이동
  
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
 const navigateToMyPage = () => {
  navigate('/mypage'); // 마이페이지 경로로 이동
};

const handleSearch = (makers: any) => {
  // handleSearch 함수의 로직을 구현합니다.
  // 필요한 동작을 수행하고 상태를 업데이트합니다.
  console.log("헤더컴포넌트에서 보내는 것:",makers); // 예시로 makers를 콘솔에 출력해보았습니다.
};

  return (
    <Header>
  
      <Logo onClick={() => navigate('/')}>travelMaker</Logo>
      <SearchBoxContainer>
      <FilterSearch onSearch={handleSearch} />
      </SearchBoxContainer>
      <UserIconContainer>
      <UserIcon onClick={toggleMenu} />
        {isOpen && (
          <Menu>
              <MenuItem onClick={handleLoginLogoutClick}>
              {isLoggedIn ? '로그아웃' : '로그인'}
              </MenuItem>
            <MenuItem>회원가입</MenuItem>
            <MenuItem onClick={navigateToMyPage}>마이페이지</MenuItem>
          </Menu>
        )}
        </UserIconContainer>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 40px;
  /* border-bottom: 1px solid #8CC4F8; */
  background-color: #00BFFF;
  justify-content: space-around;
`;
const Logo = styled.h1`
  color: #fff;
  text-align: center;
  font-family: "YourFontName", sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 10rem;
  cursor: pointer; // 클릭 가능하도록 커서 변경
`;

const SearchBoxContainer = styled.div`
  position: relative;
  margin-right: 116px; // 오른쪽으로 조금 이동시키기 위해 마진 추가
`;

// const SearchBox = styled.input`
//   width: 300px;
//   height: 50px;
//   padding: 0 20px;
//   border-radius: 50px;
//   border: 2px solid var(--searchBlue, #8cc4f8);
//   /* border: none; */
//   box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
//   font-family: Inter;
// `;

// const SearchIcon = styled(FontAwesomeIcon)`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   /* transform: translateY(-50%); */
//   color: #8cc4f8;
//   cursor: pointer;
// `;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer; 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 7.74194C23.9194 7.74194 27.0968 10.9194 27.0968 14.8387C27.0968 18.7581 23.9194 21.9355 20 21.9355C16.0806 21.9355 12.9032 18.7581 12.9032 14.8387C12.9032 10.9194 16.0806 7.74194 20 7.74194ZM20 35.4839C15.2661 35.4839 11.0242 33.3387 8.18548 29.9839C9.70161 27.129 12.6694 25.1613 16.129 25.1613C16.3226 25.1613 16.5161 25.1935 16.7016 25.25C17.75 25.5887 18.8468 25.8064 20 25.8064C21.1532 25.8064 22.2581 25.5887 23.2984 25.25C23.4839 25.1935 23.6774 25.1613 23.871 25.1613C27.3306 25.1613 30.2984 27.129 31.8145 29.9839C28.9758 33.3387 24.7339 35.4839 20 35.4839Z" fill="white"/></svg>');
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

const UserIconContainer = styled.div`
  position: relative; /* 부모 컨테이너에 relative 설정 */
`;