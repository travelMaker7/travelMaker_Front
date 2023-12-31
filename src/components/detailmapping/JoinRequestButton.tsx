import axios from "axios";
// import React, { useState } from "react";
import styled from "styled-components";

interface JoinRequestButtonProps {
  tripPlanId: number;
  overWish: boolean;
  isVisible: boolean;
  hostId: number | undefined;
}

const JoinRequestButton: React.FC<JoinRequestButtonProps> = ({
  tripPlanId,
  overWish,
  isVisible,
  hostId,
}) => {
  const handleJoinRequest = async () => {
    try {
      const response = await axios.post(
        "https://sosak.store/api/v1/accompany/guest",
        {
          tripPlanId,
          hostId: hostId,
          joinStatus: "승인대기",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response.data : ", response.data);
      console.log("response.data : ", tripPlanId);

      if (response.status === 200) {
        alert("동행신청이 완료되었습니다.");
      } else {
        alert("동행신청에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("동행신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <JoinButton
      isVisible={isVisible}
      onClick={handleJoinRequest}
      disabled={!overWish}
    >
      {overWish ? "신청불가" : "동행신청"}
    </JoinButton>
  );
};

const JoinButton = styled.button<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: var(--blue-200, #6fadff);
  border: none;
  border-radius: 10px;
  padding: 5px;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    color: var(--blue-200, #6fadff);
    border: 1px solid #6fadff;
  }
`;

export default JoinRequestButton;
