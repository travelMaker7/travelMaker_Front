import React from "react";
import styled from 'styled-components';

interface ImageBoxProps {
  image: string;
  tag: string;
  onClick: (tag: string) => void; // 클릭 이벤트 처리 함수
}


const ImageBoxContainer = styled.div`
  margin: -10px;
  margin-left: 1px;
  margin-bottom: 5%;
  margin-top: 1%;
  cursor: pointer;
`;

const Image = styled.img``;

const Tag = styled.div`
  font-size: 30px;
  font-weight: bold;
  box-sizing:content-box;
  margin-top: -17px;


  &.Seoul { color: #C89E85; }
  &.Gyeonggido { color: #5196F1; }
  &.Jeju { color: #84e45b; }
  &.Chungcheongdo { color: #24924e; }
  &.Gangwondo { color: #2fc4e6; }
  &.Incheon { color: #eb879b; }
  &.Gyeongsangdo { color: #65baa3; }
  &.Jeollado { color: #4e41c6; }
`;

// const ImageBox: React.FC<ImageBoxProps> = ({ image, tag }) => {
//   return (
//     <ImageBoxContainer>
//       <Image src={image} alt={tag} />
//       <Tag className={tag}>{tag}</Tag>
//     </ImageBoxContainer>
//   );
// };


const ImageBox: React.FC<ImageBoxProps> = ({ image, tag, onClick }) => {
  return (
    <ImageBoxContainer onClick={() => onClick(tag)}>
      <Image src={image} alt={tag} />
      <Tag className={tag}>{tag}</Tag>
    </ImageBoxContainer>
  );
};

export default ImageBox;
