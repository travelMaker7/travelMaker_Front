import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const MyPageScheduleDelete: React.FC<DeleteModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal className="delete-modal">
      <ModalContent>
        <ModalText>정말로 이 일정을 삭제하시겠습니까?</ModalText>
        <ButtonGroup>
          <Button onClick={onConfirm}>확인</Button>
          <Button onClick={onCancel}>취소</Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

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
  margin-bottom: 20px; // 마진 추가
  font-size: 16px; // 글꼴 크기 변경
  text-align: center; // 텍스트 가운데 정렬
  color: #555;
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

export default MyPageScheduleDelete;
