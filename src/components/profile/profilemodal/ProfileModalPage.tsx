import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserProfileModal from './UserProfileModal';
import axios from "axios";
import {ProfileData} from "./ProfileInfo";

interface ProfileResponse{
  data:ProfileData;
}
const ProfileModalPage:React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState(3); // 임시로 박아놓음
  const [profileData, setProfileData] = useState<ProfileData>();

  useEffect(() => {
    getTargetUserProfileData();
  }, []) ;
  // 모달을 여는 함수
  const handleOpenModal = () => {
    setTargetUserId(targetUserId); // 임시로 박아놓음
    setModalOpen(true);
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const getTargetUserProfileData = async () => {
    console.log("타인 프로필 targetUserId : ", targetUserId)
    try{
      const response = await axios.get<ProfileResponse>(
        `https://sosak.store/api/v1/mypage/profile/${targetUserId}`,
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
          }
        },
      );
      console.log("타인 프로필 조회 성공 : ", response.data);
      setProfileData(response.data.data);
    }catch(error){
      console.log("프로필 조회 실패", error);
    }
    
  }
  return (
    <div>
      <OpenModalButton onClick={handleOpenModal}>프로필 모달 열기</OpenModalButton>
      <UserProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profileData={profileData}
        targetUserId={targetUserId}
      />
    </div>
  );
};

export default ProfileModalPage;

// 버튼 스타일 정의
const OpenModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;