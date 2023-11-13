import React, { useState } from 'react';
import axios from "axios";
import styled from "styled-components";


interface ProfileData {
  nickname: string;
  imageUrl: string;
  userAgeRange: string;
  userGender: string;
  userDescription: string;
  photographer: number;
  timeIsGold: number;
  kingOfKindness: number;
  professionalGuide: number;
  mannerScore: number;
}

interface Props {
  profileProp: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>; 
}

const ProfileComponent: React.FC<Props> = ({ profileProp, setProfile }) => {

  
  const [description, setDescription] = useState(profileProp.userDescription);

 
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

 
  const handleProfileUpdate = async () => {
    try {
      
      const response = await axios.put('/api/v1/mypage/profile', {
        ...profileProp,
        userDescription: description,
      });
      console.log(response.data); 
      alert('프로필이 업데이트 되었습니다.');
    const updatedProfile = await axios.get('/api/v1/mypage/profile');
    setProfile(updatedProfile.data); 
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    alert('프로필 업데이트에 실패했습니다.');
  }
};
  
    return (
      <ProfileWrapper>
        <ProfileImageSection>
        <ImageAndName>
          <ProfileImage src={profileProp.imageUrl} alt={profileProp.nickname} />
          <Name>{profileProp.nickname}</Name>
        </ImageAndName>
        <NameAndDetails>
        <Details style={{marginBottom: "15px", borderBottom: "2px solid #848484"}}>{profileProp.userGender}</Details>
        <Details style={{borderBottom: "2px solid #848484"}}>{profileProp.userAgeRange}</Details>
        </NameAndDetails>
        </ProfileImageSection>
        <ProfileDetails>
        <IntroductionTitle style={{marginBottom:"-1px"}}>{profileProp.nickname}님 소개</IntroductionTitle> 
        <TextArea value={description} onChange={handleDescriptionChange} />
          <Button onClick={handleProfileUpdate}>프로필 수정</Button>
        </ProfileDetails>
      </ProfileWrapper>
    );
  };
  

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: flex-start; 
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
  margin-right: 60px;
  padding-left: 0px; 
`;

const ImageAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  height: 108px;
`;


const ProfileImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;


const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 0px;
  border-bottom: 2px solid skyblue;
  width: 400px;
  height: 108px;
  position: relative; 
`;

const NameAndDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size:13px;
  margin-top: 4%;
  font-weight: bold;
`;

const Name = styled.span`
  width: 100px; 
  height: 20px;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  font-size:13px;
  font-weight:bold;
`;


const Details = styled.span`
  font-size: 1em;
  color: #555;
  width:100%;
  `;

const TextArea = styled.textarea`
  font-size: 0.9rem;
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  border: none;
  margin-bottom: 1rem;
  resize: none;
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

const IntroductionTitle = styled.h3`
  font-size: 11px;
  color: #333;
  margin-bottom: 10px; 
  margin-top: -16px;
  text-align: left;
`;

export default ProfileComponent;

