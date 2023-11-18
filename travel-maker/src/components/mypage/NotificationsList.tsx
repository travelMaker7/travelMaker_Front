import React from "react";
import styled from "styled-components";
import { useNotifications } from "@/components/mypage/useNotifications";
import NotificationItem from "./NotificationItem";

const NotificationsList: React.FC = () => {
  const { data: notifications, isLoading, isError } = useNotifications();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>새로운 알림이 없습니다.</div>;

  return (
    <ListContainer>
      {notifications?.map((notification: any) => (
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
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px; // 패딩 증가
  width: 100%;
  max-width: 600px; // 최대 폭 설정
  margin: 20px auto; // 가운데 정렬
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 그림자 효과 강조
  background: white; // 배경색 추가
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); // 호버 시 그림자 효과 변경
  }
`;

const NotificationContainer = styled.div`
  border-bottom: 1px solid #e0e0e0; // 경계선 색상 변경
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #f8f8f8; // 배경색 추가
  transition: background-color 0.3s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f0f0; // 호버 시 배경색 변경
  }
`;

export default NotificationsList;
