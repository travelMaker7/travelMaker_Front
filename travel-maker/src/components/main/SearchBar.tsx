// import React from "react";
// import "./SearchBar.css";

// const SearchBar: React.FC = () => {
//     return (
//       <div className="search-bar">
//         <p>하얀 천과 바람만 있으면.. 어디든 갈 수 있어</p>
//         <input type="text" placeholder="검색..." />
//       </div>
//     );
//   };
  
//   export default SearchBar;

import React from "react";
import styled from 'styled-components';
import SearchIconImg from "../../assets/images/mainpageimages/SearchIcon.png"; // Changed this line

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-left: 2%;
`;

const SearchP = styled.p`
  font-size: 20px; 
  color: #5A5A5A; 
  font-weight: bold;
  margin-bottom: 2%;
`;

const SearchInput = styled.input`
  width: 40%;
  height: 40px;
  border: 2px solid;
  border-radius: 40px;
  padding: 8px 12px;
  border-color: #8CC4F8;
  background-color: #FFFFFF;
  box-shadow:  5px 6px hsl(0, 32%, 91%);  
  color: black;
  outline: none;
  font-size: 20px;

  &::placeholder {
    color: transparent;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 53%;
  transform: translateY(70%);
  right: 30%;
`;

const SearchBar: React.FC = () => {
    return (
      <SearchContainer>
        <SearchBarDiv>
          <SearchP>하얀 천과 바람만 있으면.. 어디든 갈 수 있어</SearchP>
          <SearchInput type="text" placeholder="검색..." />
          <SearchIcon src={SearchIconImg} alt="search" /> // Changed this line
        </SearchBarDiv>
      </SearchContainer>
    );
};
  
export default SearchBar;
