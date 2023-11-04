import React, { useState } from "react";
import styled from "styled-components";

// 목 데이터
const mockRegisteredSchedules = [
  {
    scheduleId: "1",
    scheduleName: "서울 여행",
    scheduleDescription: "서울의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "2",
    scheduleName: "광주 여행",
    scheduleDescription: "서울의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "3",
    scheduleName: "인천 여행",
    scheduleDescription: "서울의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "4",
    scheduleName: "남양주 여행",
    scheduleDescription: "서울의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "4",
    scheduleName: "남양주 여행",
    scheduleDescription: "서울의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
];

const mockParticipatingSchedules = [
  {
    tripPlanId: "1",
    scheduleName: "부산 여행",
    scheduleDate: "2023-11-05",
    arriveTime: "10:00",
    leaveTime: "18:00",
    nickname: "임꺽정",
    region: "해운대",
  },
  // ... 추가 일정
];

interface RegisteredSchedule {
  scheduleId: string;
  scheduleName: string;
  scheduleDescription: string;
  nickname: string;
  startDate: string;
  finishDate: string;
}

interface ParticipatingSchedule {
  tripPlanId: string;
  scheduleName: string;
  scheduleDate: string;
  arriveTime: string;
  leaveTime: string;
  nickname: string;
  region: string;
}

interface ButtonProps {
  isActive: boolean;
}

type Schedule = RegisteredSchedule | ParticipatingSchedule;

const ScheduleTabs: React.FC = ({}) => {
  const [activeTab, setActiveTab] = useState("registered");

  const renderSchedules = (schedules: Schedule[]) => {
    return schedules.map((schedule) => {
      const key =
        "scheduleId" in schedule ? schedule.scheduleId : schedule.tripPlanId;

      return (
        <ScheduleCard key={key}>
          <h3>{schedule.scheduleName}</h3>
          <p>{schedule.nickname}</p>
        </ScheduleCard>
      );
    });
  };

  return (
    <TabsContainer>
      <div>
        <TabButton
          onClick={() => setActiveTab("registered")}
          isActive={activeTab === "registered"}
        >
          등록한 일정
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("participating")}
          isActive={activeTab === "participating"}
        >
          참여 대기중
        </TabButton>
      </div>
      <SchedulesContainer>
        {activeTab === "registered"
          ? renderSchedules(mockRegisteredSchedules)
          : renderSchedules(mockParticipatingSchedules)}
      </SchedulesContainer>
    </TabsContainer>
  );
};

// 스타일드 컴포넌트 정의
const TabsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5rem 0;
  border-top: 2px solid #83d2ef;
`;

const TabButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  margin: 10px;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const SchedulesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px; // 카드 사이의 간격
  padding: 0 10px;
  width: 100%;
`;

const ScheduleCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  width: 20%;
  height: 10rem;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default ScheduleTabs;
