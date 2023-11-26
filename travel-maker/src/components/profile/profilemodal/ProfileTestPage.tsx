// ModalTestPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';
import ProfileImage from '../../../assets/images/profile/profileimg.png'
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

const ModalTestPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 데이터를 상태로 관리합니다. 실제 데이터로 대체해야 합니다.
  const profileData = {
    // image: 'profile-image-url.jpg', // 실제 이미지 URL로 변경
    imageUrl: ProfileImage,
    nickname: 'dbsehdld9161',
    userGender: '남성',
    userAgeRange: '20대',
    UesrDescription: '안녕하세요! 여행을 좋아하는 dbsehdld9161입니다.',
  };

  // 모달을 여는 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <OpenModalButton onClick={handleOpenModal}>프로필 모달 열기</OpenModalButton>
      {/* ProfileModal에 profileData prop 추가 */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profileData={profileData}
      />
    </div>
  );
};

export default ModalTestPage;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import ProfileModal, { ProfileData } from "./ProfileModal";

// const OpenModalButton = styled.button`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   margin: 20px;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ModalTestPage = ({ userId }: { userId: string }) => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileData>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

 

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get<ProfileData>(
//           `/api/v1/mypage/profile/${userId}`,
//           {
//             headers: {},
//           }
//         );

//         setProfileData({
//           imageUrl: response.data.imageUrl,
//           nickname: response.data.nickname,
//           userGender: response.data.userGender,
//           userAgeRange: response.data.userAgeRange,
//           userDescription: response.data.userDescription,
//         });
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchProfileData();
//     }
//   }, [userId]);

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div>Error: {error.message}</div>;

//   if (!profileData) return <div>No profile data</div>;

//   return (
//     <div>
//       <OpenModalButton onClick={handleOpenModal}>
//         프로필 모달 열기
//       </OpenModalButton>
//       {profileData && (
//         <ProfileModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           profileData={profileData}
//         />
//       )}
//     </div>
//   );
// };
// export default ModalTestPage;
