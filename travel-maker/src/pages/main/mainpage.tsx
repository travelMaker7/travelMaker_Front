import { useContext, useState } from "react";
import { AuthContext} from '../../components/contexts/AuthContext';
import TravelScheduleButton from "../../components/main/TravelScheduleButton";
import ImageBox from "../../components/main/ImageBox";
import ex1 from "../../assets/images/mainpageimages/ex1.png";
import ex2 from "../../assets/images/mainpageimages/ex2.png";
import ex3 from "../../assets/images/mainpageimages/ex3.png";
import ex4 from "../../assets/images/mainpageimages/ex1.png";
import ex5 from "../../assets/images/mainpageimages/ex4.png";
import ex6 from "../../assets/images/mainpageimages/ex5.png";
import ex7 from "../../assets/images/mainpageimages/ex6.png";
import ex8 from "../../assets/images/mainpageimages/ex7.png";
import { HeaderComponent } from "@/pages/detailmapping/HeaderComponent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const imagesAndTags = [
  { image: ex1, tag: "서울" },
  { image: ex2, tag: "경기" },
  { image: ex3, tag: "인천" },
  { image: ex4, tag: "강원도" },
  { image: ex5, tag: "충청도" },
  { image: ex6, tag: "경상도" },
  { image: ex7, tag: "전라도" },
  { image: ex8, tag: "제주도" }
];

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const Main = styled.main``;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  color: black;
`;

const MainPage = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('MainPage is rendered outside the AuthProvider.');
  }

  const [openLocalTag, setOpenLocalTag] = useState<string>("");

  const navigate = useNavigate();

  const handleOpenLocalCategryMap = (index: number) => {
    setOpenLocalTag(imagesAndTags[index].tag);
    console.log(openLocalTag);
    navigate("/localcategorymap");
  }

  return (
    <>
      <HeaderComponent />
      <MainPageContainer>
        <Main>
          {/* {isLoggedIn ? ( */}
            <div>
              <TravelScheduleButton />
              <ImageContainer>
                {imagesAndTags.map((item, i) => (
                  <ImageBox key={i} image={item.image} tag={item.tag} onClick ={() => handleOpenLocalCategryMap(i)}/>
                ))}
              </ImageContainer>
            </div>
        </Main>
      </MainPageContainer>
    </>
  );
};

export default MainPage;