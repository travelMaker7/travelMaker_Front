import React from "react";
import styled from 'styled-components';
import { Keyboard } from "swiper/modules";

interface ImageBoxProps {
  image: string;
  tag: string;
  onClick: () => void;
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


  &.서울 { color: #C89E85; }
  &.경기 { color: #5196F1; }
  &.인천 { color: #84e45b; }
  &.강원도 { color: #24924e; }
  &.충청도 { color: #2fc4e6; }
  &.경상도 { color: #eb879b; }
  &.전라도 { color: #65baa3; }
  &.제주도 { color: #4e41c6; }
`;

const ImageBox: React.FC<ImageBoxProps> = ({image, tag}) => {
  return (
    <ImageBoxContainer>
      <Image src={image} alt={tag} />
      <Tag className={tag}>{tag}</Tag>
    </ImageBoxContainer>
  );
};

export default ImageBox;
