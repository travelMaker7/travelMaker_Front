import React from "react";
import styled, { keyframes } from "styled-components";
import { useNotifications } from "@/components/mypage/useNotifications";
import NotificationItem from "./NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const NotificationsList: React.FC = () => {
  const { data: notifications, isLoading, isError } = useNotifications();

  if (isError) return <div>새로운 알림이 없습니다.</div>;

  return (
    <ListContainer>
      {isLoading ? (
        <SpinnerContainer>
          <RotatingIcon icon={faSpinner} />
        </SpinnerContainer>
      ) : (
        notifications?.map((notification: any) => (
          <NotificationContainer key={notification.joinId}>
            <NotificationItem notification={notification} />
          </NotificationContainer>
        ))
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  padding: 0 15px; // 패딩 증가
  width: 100%;
  max-width: 600px; // 최대 폭 설정
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  background: white; // 배경색 추가
  transition: box-shadow 0.2s ease-in-out;
`;

const NotificationContainer = styled.div`
  border-bottom: 1px solid #e0e0e0; // 경계선 색상 변경
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #f8f8f8; // 배경색 추가
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    /* background: #f0f0f0; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RotatingIcon = styled(FontAwesomeIcon)`
  animation: ${rotate} 2s linear infinite;
  font-size: 24px;
`;

export default NotificationsList;
