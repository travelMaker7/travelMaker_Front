import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


export interface ProfileData {
  imageUrl?: string;
  nickname?: string;
  userGender?: string;
  userAgeRange?: string;
  userDescription?: string;
}
  
  interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileData: ProfileData;
  }
  


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;


const ModalContainer = styled.div`
  background: #fff;
  padding-top: 10px;
  padding-bottom:10px;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  position: relative;
  height: 100%;
  max-height:520px;
  box-sizing: border-box;
`;


const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom:2px solid transparent;
  border-radius: 50%;
    border-image: linear-gradient(to right, red 0%, blue 10%, orange 100%);
    border-image-slice: 1;
  padding: 0 20px; 
  width: calc(100% - 40px); 
`;


const ProfileImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;


const Nickname = styled.h2`
  margin-left: 10px;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;


const InfoItem = styled.div`
  padding: 6px 10px; 
  background: #f0f0f0; 
  border-radius: 30px; 
  font-size: 9px; 
  font-weight: bolder; 
  color: #333; 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  margin-right: 10px;
  width: 20px;
  height: 10px;
`;


const UserInfo = styled.div`
  display: flex;
  gap: 3px; 
  font-size: 1rem;
  margin-top: -10px;
  padding-left: 20px; 
  margin-bottom: 20px;
  flex-wrap: wrap; 
`;


const IntroductionContentBox = styled.div`
  border: 1px solid #ccc; 
  padding: 16px;
  margin-top: 8px; 
  border-radius: 8px;
  height:296px;
`;


const IntroductionContainer = styled.div`
   font-size: 0.9rem; 
  padding-left: 20px; 
  padding-right: 20px; 
`;

const IntroductionHeader = styled.h3`
  font-size: 0.9rem;
  color: #c7c4c4;
  margin-bottom: 8px;
  padding-right: 310px; 
  padding-top:15px;
  margin: 0;
`;


const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profileData }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProfileImage src={profileData.imageUrl} alt="Profile" />
            <Nickname>{profileData.nickname}</Nickname>
          </div>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <UserInfo>
          <InfoItem>{profileData.userGender}</InfoItem>
          <InfoItem>{profileData.userAgeRange}</InfoItem>
        </UserInfo>
        <IntroductionContainer>
          <IntroductionHeader>{profileData.nickname}님 소개</IntroductionHeader>
          <IntroductionContentBox>{profileData.userDescription}</IntroductionContentBox>
        </IntroductionContainer>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default ProfileModal;
