import React from "react";
import styled from "styled-components";

const ProfileComponent: React.FC = () => {
  return (
    <ProfileWrapper>
      <ProfileImageSection>
        <ProfileImage src="profile-photo-url.jpg" alt="" />
        <Name>닉네임</Name>
        <SubTitle>청춘을 만끽</SubTitle>
      </ProfileImageSection>
      <ProfileDetails>
        <Name>닉네임 소개</Name>
        <Details>
          안녕하세요 저는 백패킹, 캠핑, 등산, 노래 감상, 맛집 탐방 등을 좋아하는
          닉네임입니다. 저는 낯선지역에 처음와서 노래를 들으며 캠핑을 하는걸
          정말 좋아합니다! 저랑 같이 여행하고 싶으신 분들은 저의 메이트가
          되어주세요!
        </Details>
        <Button>프로필 수정</Button>
      </ProfileDetails>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 20px;
  border-radius: 10px; // 둥근 모서리

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px; // 안쪽 여백을 주어 내용물과 테두리 사이의 간격을 만듭니다.
  border-radius: 10px;
  width: 150px; // 정사각형의 가로 길이를 설정합니다.
  height: 150px; // 정사각형의 세로 길이를 설정합니다. 가로와 같게 하여 정사각형을 만듭니다.
  background: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #000;
  margin-bottom: 10px; // 이미지와 이름 사이의 간격
`;

const ProfileDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  margin-left: 10%; // 이미지와 세부정보 사이의 간격
  border-bottom: 2px solid #83d2ef; // 세부정보와 소개 사이의 간격
  height: 100%;
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Name = styled.h2`
  font-size: 1em;
  margin-bottom: 5px; // 이름과 상세정보 사이의 간격
`;

const SubTitle = styled.span`
  font-size: 0.8em;
  color: #555; // 글자색은 예시입니다.
`;

const Details = styled.p`
  font-size: 1em;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5em;
  height: 50%;
  text-align: left;
  white-space: pre-line;
  max-height: 120px;
  overflow-y: auto;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 5rem;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: #83d2ef;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  cursor: pointer;
`;
export default ProfileComponent;
