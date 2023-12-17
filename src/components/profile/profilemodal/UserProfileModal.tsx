import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatRoomButton from '@/components/chat/chatRoomButton';
import {ProfileModalProps} from "./ProfileInfo";

const UserProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profileData, targetUserId}) => {
  
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  // 상대 프로필 조회시 사용해야함 
  const navigate = useNavigate();

  const handleCreateAndEnterRoom = () => {
    console.log('토큰정보 :', localStorage.getItem("access_token"))
    if(isRoomCreated){
      console.log("chat room is already created")
    }
    // 1:1 채팅방 생성 api 요청 & 입장
    axios
      .post(`https://sosak.store/api/v1/chat/room`,
      // .post(`http://localhost:8080/api/v1/chat/room`,
      {
        "targetUserId" : targetUserId,
        "roomName" : "채팅방"
      },
      {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {

        const {chatRoomId, redisRoomId} = response.data.data;
        setIsRoomCreated(true);
        console.log('redis : ',redisRoomId)
        console.log('chat : ',chatRoomId)

        // const enterRoomUri = `http://localhost:8080/api/v1/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`
        const enterRoomUri = `https://sosak.store/api/v1/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`

        return axios.get(enterRoomUri, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }).then(response => {
          console.log("Entered the chat room success", JSON.stringify(response.data.data))
          navigate(`/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`)
          console.log("화면이동 함?")
        });
      })
      .catch(error => {
        console.log("error creating room ", error);
      });
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProfileImage src={profileData?.imageUrl} alt="Profile" />
            <Nickname>{profileData?.nickname}</Nickname>
          </div>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <UserInfo>
          <InfoItem>{profileData?.userGender}</InfoItem>
          <InfoItem>{profileData?.userAgeRange}</InfoItem>
        </UserInfo>
        <IntroductionContainer>
          <IntroductionHeader>{profileData?.nickname}님 소개</IntroductionHeader>
          <IntroductionContentBox>{profileData?.userDescription}</IntroductionContentBox>
        </IntroductionContainer>
          <ChatRoomButton handleCreateAndEnterRoom={handleCreateAndEnterRoom}/>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default UserProfileModal;

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
  max-height:550px;
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
  height:286px;
  // height:296px;
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
