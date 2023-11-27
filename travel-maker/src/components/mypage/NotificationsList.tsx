import React from "react";
import styled, { keyframes } from "styled-components";
import {
  NotificationData,
  useNotifications,
} from "@/components/mypage/useNotifications";
import NotificationItem from "./NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

const NotificationsList: React.FC = () => {
  const { data: notifications, isLoading, isError } = useNotifications();

  if (isLoading) {
    return (
      <SpinnerContainer>
        <RotatingIcon icon={faSpinner} />
      </SpinnerContainer>
    );
  }

  if (isError) {
    return <div>Error fetching notifications.</div>;
  }

  if (!notifications || notifications.length === 0) {
    return (
      <NoNotificationsContainer>
        <NoNotificationsIcon icon={faBellSlash} size="3x" />{" "}
        <NoNotificationsText>알림이 없습니다</NoNotificationsText>
        <NoNotificationsSubText>
          모든 업데이트를 확인하셨습니다! 나중에 새로운 업데이트를 확인해
          보세요!
        </NoNotificationsSubText>
      </NoNotificationsContainer>
    );
  }

  // Render notifications if the array is not empty
  return (
    <ListContainer>
      {notifications.map((notification: NotificationData) => (
        <NotificationContainer key={notification.joinId}>
          <NotificationItem notification={notification} />
        </NotificationContainer>
      ))}
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
const NoNotificationsContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: #6c757d; // Example color
`;

const NoNotificationsIcon = styled(FontAwesomeIcon)`
  margin-bottom: 15px;
  color: #adb5bd; // Example color
`;

const NoNotificationsText = styled.h3`
  margin-bottom: 10px;
`;

const NoNotificationsSubText = styled.p`
  font-size: 0.9em;
`;

export default NotificationsList;
