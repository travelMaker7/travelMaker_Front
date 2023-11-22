import { useJoin } from "@/components/mypage/useJoin";
import React, { useState } from "react";
import { NotificationData } from "./useNotifications";
import styled from "styled-components";

interface Props {
  notification: NotificationData;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const updateJoinStatus = useJoin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleModalOpen = (action: any) => {
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleResponse = async (status: string) => {
    updateJoinStatus.mutate({
      joinId: notification.joinId,
      joinStatus: status,
    });
    setIsModalOpen(false);
    setActionType("");
  };

  return (
    <NotificationWrapper>
      <NotificationText>
        {notification.nickname} {notification.scheduleName} -{" "}
        {notification.destinationName} 동행신청
      </NotificationText>
      <ButtonGroup>
        <Button onClick={() => handleModalOpen("신청수락")}>수락</Button>
        <Button onClick={() => handleModalOpen("신청거절")}>거절</Button>
      </ButtonGroup>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalText>
              {notification.nickname}님의 동행신청을{" "}
              {actionType === "신청수락" ? "수락" : "거절"} 하시겠습니까?
            </ModalText>
            <ButtonGroup>
              <Button onClick={() => handleResponse("승인")}>확인</Button>
              <Button onClick={() => setIsModalOpen(false)}>취소</Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </NotificationWrapper>
  );
};

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationText = styled.p`
  margin: 0;
  flex-grow: 1;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-left: 4px solid #3498db;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #70b9d6;
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // 배경 색상 변경
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px; // 패딩 증가
  max-width: 500px; // 최대 너비 설정
  border-radius: 15px; // 모서리 둥글게
  border: 2px solid #3498db; // 테두리 추가
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); // 그림자 추가
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  border-radius: 5px;
`;

export default NotificationItem;
