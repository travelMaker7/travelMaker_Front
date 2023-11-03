import React from "react";
import styled from "styled-components";

export const HeaderComponent: React.FC = () => {
  return (
    <Header>
      <Logo>travelMaker</Logo>
      <SearchBox placeholder="어디에서" style={{ fontSize: "14px" }} />
      <UserIcon />
    </Header>
  );
};
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  margin-bottom: 40px;
  /* border-bottom: 1px solid #8cc4f8; */
`;

const Logo = styled.h1`
  color: var(--blue-200, #8cc4f8);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const SearchBox = styled.input`
  width: 30%;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  padding: 0 20px;
  border-radius: 50px;
  border: 2px solid var(--searchBlue, #8cc4f8);
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  font-family: Inter;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 7.74194C23.9194 7.74194 27.0968 10.9194 27.0968 14.8387C27.0968 18.7581 23.9194 21.9355 20 21.9355C16.0806 21.9355 12.9032 18.7581 12.9032 14.8387C12.9032 10.9194 16.0806 7.74194 20 7.74194ZM20 35.4839C15.2661 35.4839 11.0242 33.3387 8.18548 29.9839C9.70161 27.129 12.6694 25.1613 16.129 25.1613C16.3226 25.1613 16.5161 25.1935 16.7016 25.25C17.75 25.5887 18.8468 25.8064 20 25.8064C21.1532 25.8064 22.2581 25.5887 23.2984 25.25C23.4839 25.1935 23.6774 25.1613 23.871 25.1613C27.3306 25.1613 30.2984 27.129 31.8145 29.9839C28.9758 33.3387 24.7339 35.4839 20 35.4839Z" fill="%2383D2EF"/></svg>');
`;
