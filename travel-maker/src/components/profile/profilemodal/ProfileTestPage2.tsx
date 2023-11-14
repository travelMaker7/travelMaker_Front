import React, { useState } from "react";
import styled from "styled-components";
import UserProfileModal from "./UserProfileModal";

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

const ProfileTestPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <OpenModalButton onClick={handleOpenModal}>
        프로필 모달 열기
      </OpenModalButton>
      <UserProfileModal
        userId="123"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProfileTestPage;
