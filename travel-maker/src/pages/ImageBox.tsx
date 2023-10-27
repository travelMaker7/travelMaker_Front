// ImageBox.tsx
import React from "react";
import styled from 'styled-components';

interface ImageBoxProps {
  image: string;
  tag: string;
}

// Define your styles here
const ImageBoxContainer = styled.div`
  margin: -12px;
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
  &.Busan { color: #5196F1; }
  &.Jeju { color: #84e45b; }
  &.Chuncheon { color: #24924e; }
  &.Gapyeong { color: #2fc4e6; }
  &.Iksan { color: #eb879b; }
  &.Yeosu { color: #65baa3; }
  &.Haenam { color: #4e41c6; }
`;

const ImageBox: React.FC<ImageBoxProps> = ({ image, tag }) => {
  return (
    <ImageBoxContainer>
      <Image src={image} alt={tag} />
      <Tag className={tag}>{tag}</Tag>
    </ImageBoxContainer>
  );
};

export default ImageBox;
