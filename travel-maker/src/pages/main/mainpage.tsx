import { useContext, useEffect, useState } from "react";
import { AuthContext} from '../../components/contexts/AuthContext';
import TravelScheduleButton from "../../components/main/TravelScheduleButton";
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
  { image: ex4, tag: "강원" },
  { image: ex5, tag: "충청" },
  { image: ex6, tag: "경상" },
  { image: ex7, tag: "전라" },
  { image: ex8, tag: "제주" }
];

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  color: black;
`;

const ImageBox = styled.div`
  margin: -10px;
  margin-left: 1px;
  margin-bottom: 5%;
  margin-top: 1%;
  cursor: pointer;
`

const Image = styled.img``;

const Tag = styled.div`
  font-size: 30px;
  font-weight: bold;
  box-sizing:content-box;

  &.서울 { color: #C89E85; }
  &.경기 { color: #5196F1; }
  &.인천 { color: #84e45b; }
  &.강원 { color: #24924e; }
  &.충청 { color: #2fc4e6; }
  &.경상 { color: #eb879b; }
  &.전라 { color: #65baa3; }
  &.제주 { color: #4e41c6; }
`;

const MainPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!auth) {
    throw new Error('MainPage is rendered outside the AuthProvider.');
  }

  const [openLocalTag, setOpenLocalTag] = useState<string>("");


  const handleOpenLocalCategoryMap = (tag: string) => {
    setOpenLocalTag(tag);
    console.log(tag);
    console.log('openLocalTag: ', openLocalTag);
    navigate(`/localcategorymap?region=${tag}`);
  }

  return (
    <>
      <HeaderComponent />
      <MainPageContainer>
        <TravelScheduleButton/>
        <ImageContainer>
          {imagesAndTags.map((item, i) => (
            <ImageBox key={i} onClick={() => handleOpenLocalCategoryMap(item.tag)}>
              <Image src={item.image} alt={item.tag} />
              <Tag className={item.tag}>{item.tag}</Tag>
            </ImageBox>
          ))}
        </ImageContainer>
      </MainPageContainer>
    </>
  );
}

export default MainPage;