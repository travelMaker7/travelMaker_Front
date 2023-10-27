import React from "react";
import styled, { createGlobalStyle } from 'styled-components'; 
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import TravelScheduleButton from "./TravelScheduleButton";
import ImageBox from "./ImageBox";
import ex1 from "../assets/images/mainpageimages/ex1.png";
import ex2 from "../assets/images/mainpageimages/ex2.png";
import ex3 from "../assets/images/mainpageimages/ex3.png";
import ex4 from "../assets/images/mainpageimages/ex1.png";
import ex5 from "../assets/images/mainpageimages/ex4.png";
import ex6 from "../assets/images/mainpageimages/ex5.png";
import ex7 from "../assets/images/mainpageimages/ex6.png";
import ex8 from "../assets/images/mainpageimages/ex7.png";

const imagesAndTags = [
  { image: ex1, tag: "Seoul" },
  { image: ex2, tag: "Busan" },
  { image: ex3, tag: "Jeju" },
  { image: ex4, tag: "Chuncheon" },
  { image: ex5, tag: "Gapyeong" },
  { image: ex6, tag: "Iksan" },
  { image: ex7, tag: "Yeosu" },
  { image: ex8, tag: "Haenam" }
];

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  text-align: center;
  height: 28%;
  width: 110%;
  border-bottom: 2px solid #83d2ef;
`;

const SearchContainer = styled.div``;

const Main = styled.main``;

const MainMessage = styled.p`
  font-size: 17px;
  color: blue;
  font-weight: bold;
  margin: 3%;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  color: black;
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: white;
  }

  #root {
    padding: 2rem;
    text-align: center;
    width: 100%;
    height: 100%;
  }
`;

const MainPage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <MainPageContainer>
        <Header>
          <TopBar />
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
        </Header>
        <Main>
          <TravelScheduleButton />
          <MainMessage>여행자들이 당신을 기다리고 있어요!</MainMessage>
          <ImageContainer>
            {imagesAndTags.map((item, i) => (
              <ImageBox key={i} image={item.image} tag={item.tag} />
            ))}
          </ImageContainer>
        </Main>
      </MainPageContainer>
    </>
  );
};

export default MainPage;