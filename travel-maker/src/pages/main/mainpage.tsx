import React, { useContext } from "react";
import { AuthContext} from '../../components/contexts/AuthContext';
import styled, { createGlobalStyle } from 'styled-components'; 
// import TopBar from "../../components/main/TopBar";
// import SearchBar from "../../components/main/SearchBar";
import TravelScheduleButton from "../../components/main/TravelScheduleButton";
import ImageBox from "../../components/main/ImageBox";
// import FilterSearch from "../../components/search/FilterSearch"
import ex1 from "../../assets/images/mainpageimages/ex1.png";
import ex2 from "../../assets/images/mainpageimages/ex2.png";
import ex3 from "../../assets/images/mainpageimages/ex3.png";
import ex4 from "../../assets/images/mainpageimages/ex1.png";
import ex5 from "../../assets/images/mainpageimages/ex4.png";
import ex6 from "../../assets/images/mainpageimages/ex5.png";
import ex7 from "../../assets/images/mainpageimages/ex6.png";
import ex8 from "../../assets/images/mainpageimages/ex7.png";
import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import { useNavigate } from 'react-router-dom';

const imagesAndTags = [
  { image: ex1, tag: "Seoul" },
  { image: ex2, tag: "Gyeonggido" },
  { image: ex3, tag: "Gangwondo" },
  { image: ex4, tag: "Chungcheongdo" },
  { image: ex5, tag: "Jeollado" },
  { image: ex6, tag: "Gyeongsangdo" },
  { image: ex7, tag: "Jeju" },
  { image: ex8, tag: "Incheon" }
];

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

// const Header = styled.header`
//   text-align: center;
//   height: 28%;
//   width: 110%;
//   border-bottom: 2px solid #83d2ef;
// `;

// const SearchContainer = styled.div``;

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
  /* html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: white; */
  }

  #root {
    padding: 2rem;
    text-align: center;
    width: 100%;
    height: 100%;
  }
`;

const MainPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!auth) {
    throw new Error('MainPage is rendered outside the AuthProvider.');
  }

  const handleImageClick = (tag: string) => {
    // 클릭된 태그에 따라 라우팅
    navigate(`/localcategorymap/${tag}`);
  };


  return (
    <>
      <GlobalStyle />
      <HeaderComponent />
      <MainPageContainer>
        
        {/* <Header>
          <TopBar />
          <SearchContainer>
            <FilterSearch />
          </SearchContainer>
        </Header> */}
        <Main>
          {/* {isLoggedIn ? ( */}
            <div>
              <TravelScheduleButton />
              <MainMessage>여행자들이 당신을 기다리고 있어요!</MainMessage>
              <ImageContainer>
                {imagesAndTags.map((item, i) => (
                  <ImageBox key={i} image={item.image} tag={item.tag} onClick={() => handleImageClick(item.tag)} />
                ))}
              </ImageContainer>
            </div>
          {/* ) : (
            <p>로그인이 필요한 서비스입니다.</p>
          )} */}
        </Main>
      </MainPageContainer>
    </>
  );
};

export default MainPage;