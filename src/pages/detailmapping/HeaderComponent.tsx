import React, { useState } from 'react';
import styled from 'styled-components';
import FilterSearch from '@/components/search/FilterSearch';
import { useNavigate } from 'react-router-dom';

import { handleLogout } from '../login/LogoutFunction';

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
        console.log(makers);
    };

    return (
        <Header>
            <LogoDiv onClick={() => navigate('/')}>
                <img
                    src="/mainpageLogo.svg"
                    alt="travelMakerLogo"
                    width={160}
                    height={100}
                />
            </LogoDiv>
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
                        <MenuItem onClick={navigateToMyPage}>
                            마이페이지
                        </MenuItem>
                    </Menu>
                )}
            </UserIconContainer>
        </Header>
    );
};

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 40px;
    /* border-bottom: 1px solid #8CC4F8; */
    background-color: #00bfff;
    justify-content: space-between;
`;
const LogoDiv = styled.div`
    display: flex;
    align-items: center;
`;

const SearchBoxContainer = styled.div`
    position: relative;
`;

const UserIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 60px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 7.74194C23.9194 7.74194 27.0968 10.9194 27.0968 14.8387C27.0968 18.7581 23.9194 21.9355 20 21.9355C16.0806 21.9355 12.9032 18.7581 12.9032 14.8387C12.9032 10.9194 16.0806 7.74194 20 7.74194ZM20 35.4839C15.2661 35.4839 11.0242 33.3387 8.18548 29.9839C9.70161 27.129 12.6694 25.1613 16.129 25.1613C16.3226 25.1613 16.5161 25.1935 16.7016 25.25C17.75 25.5887 18.8468 25.8064 20 25.8064C21.1532 25.8064 22.2581 25.5887 23.2984 25.25C23.4839 25.1935 23.6774 25.1613 23.871 25.1613C27.3306 25.1613 30.2984 27.129 31.8145 29.9839C28.9758 33.3387 24.7339 35.4839 20 35.4839Z" fill="white"/></svg>');
`;

const Menu = styled.div`
    position: absolute;
    top: 120%;
    left: 30px;
    width: 100px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
