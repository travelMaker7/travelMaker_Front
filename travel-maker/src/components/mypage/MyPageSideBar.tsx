import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  ParticipatingSchedule,
  RegisteredSchedule,
  Schedule,
} from "@/utils/Types";

// Assume that the RegisteredSchedule and ParticipatingSchedule types are defined elsewhere

export interface ButtonProps {
  isActive: boolean;
}

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
    scheduleId: "3",
    scheduleName: "광주 여행",
    scheduleDescription: "광주의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "5",
    scheduleName: "인천 여행",
    scheduleDescription: "인천의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
  {
    scheduleId: "6",
    scheduleName: "남양주 여행",
    scheduleDescription: "남양주의 숨은 명소 탐방",
    nickname: "홍길동",
    startDate: "2023-11-01",
    finishDate: "2023-11-03",
  },
];

const mockParticipatingSchedules = [
  {
    status: "승인대기",
    scheduleId: "2",
    scheduleName: "부산 여행",
    nickname: "user456",
    tripPlanId: "11",
    scheduleDate: "2023-08-10",
    arriveTime: "14:00",
    leaveTime: "18:00",
    region: "부산",
    destinationName: "해운대",
  },
  {
    status: "신청수락",
    scheduleId: "4",
    scheduleName: "서울 여행",
    nickname: "user111",
    tripPlanId: "21",
    scheduleDate: "2023-08-14",
    arriveTime: "00:00",
    leaveTime: "02:00",
    region: "서울",
    destinationName: "남산타워",
  },
  {
    status: "동행완료",
    scheduleId: "5",
    scheduleName: "서울 여행",
    nickname: "user441",
    tripPlanId: "23",
    scheduleDate: "2023-08-14",
    arriveTime: "00:00",
    leaveTime: "02:00",
    region: "서울",
    destinationName: "남산타워",
  },
];

const MyPageSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("registered");
  const [registeredSchedules, setRegisteredSchedules] = useState<
    RegisteredSchedule[]
  >(mockRegisteredSchedules);
  const [participatingSchedules, setParticipatingSchedules] = useState<
    ParticipatingSchedule[]
  >(mockParticipatingSchedules);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMouseEnter = () => setShowDeleteButton(true);
  const handleMouseLeave = () => setShowDeleteButton(false);

  const getRegisteredSchedules = async () => {
    try {
      const response = await axios.get("/api/v1/mypage/schedules/registered", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 201) {
        setRegisteredSchedules(response.data.data.schedules);
      } else {
        console.log("등록한 일정 조회 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getParticipatingSchedules = async (status: string) => {
    try {
      const response = await axios.get(
        `/api/v1/mypage/schedules/participating?status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        setParticipatingSchedules(response.data.data.schedules);
      } else {
        console.log("참여 일정 조회 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeTab === "registered") {
      getRegisteredSchedules();
    } else {
      getParticipatingSchedules(activeTab);
    }
  }, [activeTab]);

  return (
    <PageContainer>
      <Sidebar>
        <SidebarItem
          onClick={() => setActiveTab("registered")}
          isActive={activeTab === "registered"}
        >
          등록한 일정
        </SidebarItem>
        <SidebarItem
          onClick={() => setActiveTab("승인대기")}
          isActive={activeTab === "승인대기"}
        >
          참여 대기중
        </SidebarItem>
        <SidebarItem
          onClick={() => setActiveTab("신청수락")}
          isActive={activeTab === "신청수락"}
        >
          참여 예정
        </SidebarItem>
        <SidebarItem
          onClick={() => setActiveTab("동행완료")}
          isActive={activeTab === "동행완료"}
        >
          참여 완료
        </SidebarItem>
      </Sidebar>
      <ContentArea>
        {activeTab === "registered" &&
          registeredSchedules.map((schedule) => (
            <ScheduleCard key={schedule.scheduleId}>
              <ImageContainer>
                <img
                  src="https://source.unsplash.com/random/800x800"
                  alt="지도 미리보기"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </ImageContainer>
              <TextContent>
                <StyledH3>{schedule.scheduleName}</StyledH3>
                <StyledP>{schedule.scheduleDescription}</StyledP>
              </TextContent>
            </ScheduleCard>
          ))}
        {activeTab === "승인대기" &&
          participatingSchedules
            .filter((schedule) => schedule.status === "승인대기")
            .map((schedule) => (
              <ScheduleCard key={schedule.scheduleId}>
                <ImageContainer>
                  <img
                    src="https://source.unsplash.com/random/100x100"
                    alt="지도 미리보기"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </ImageContainer>

                <TextContent>
                  <StyledH3>{schedule.scheduleName}</StyledH3>
                  <StyledP>여행지: {schedule.destinationName}</StyledP>
                  <StyledP>일정 날짜: {schedule.scheduleDate}</StyledP>
                </TextContent>
              </ScheduleCard>
            ))}

        {activeTab === "신청수락" &&
          participatingSchedules
            .filter((schedule) => schedule.status === "신청수락")
            .map((schedule) => (
              <ScheduleCard
                key={schedule.scheduleId}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ImageContainer>
                  <img
                    src="https://source.unsplash.com/random/200x200"
                    alt="지도 미리보기"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </ImageContainer>

                <TextContent>
                  <StyledH3>{schedule.scheduleName}</StyledH3>
                  <StyledP>여행지: {schedule.destinationName}</StyledP>
                  <StyledP>일정 날짜: {schedule.scheduleDate}</StyledP>
                </TextContent>
                {/* {showDeleteButton && (
                  <DeleteButton
                    onClick={() => handleDeleteClick(schedule.tripPlanId)}
                  >
                    X
                  </DeleteButton>
                )} */}
              </ScheduleCard>
            ))}

        {activeTab === "동행완료" &&
          participatingSchedules
            .filter((schedule) => schedule.status === "동행완료")
            .map((schedule) => (
              <ScheduleCard key={schedule.scheduleId}>
                <TextContent>
                  <StyledH3>{schedule.scheduleName}</StyledH3>
                  <StyledP>여행지: {schedule.destinationName}</StyledP>
                  <StyledP>일정 날짜: {schedule.scheduleDate}</StyledP>
                </TextContent>
                <ReviewButton>리뷰하기</ReviewButton>
              </ScheduleCard>
            ))}
        {/* {showDeleteModal && (
          <DeleteModal
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )} */}
      </ContentArea>
    </PageContainer>
  );
};
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ecf0f1; // Light background for the content area

`;

const Sidebar = styled.div`
  width: 200px; // Increased width for better appearance
  background-color: #34495e; // Darker shade for contrast
  padding: 15px;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.3);
  color: #ecf0f1; // Light text for readability
`;

const SidebarItem = styled.div<ButtonProps>`
  padding: 8px 12px; // Reduced padding
  margin-bottom: 5px; // Smaller margin for a tighter layout
  background-color: ${(props) => (props.isActive ? "#2c3e50" : "transparent")};
  color: ${(props) => (props.isActive ? "#fff" : "#bdc3c7")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem; // Smaller font size if needed
  transition: all 0.3s;

  &:hover {
    background-color: #2c3e50;
    color: #fff;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  text-align: center;
  /* justify-content: center; */
  margin-top: 20px;
  gap: 20px; // 카드 사이의 간격
  padding: 0 10px;
  width: 100%;
`;

const ScheduleCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; // 자식 요소들을 세로로 쌓음
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  width: 10rem; // 가로 크기 고정
  height: 200px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); // 호버 시 그림자 효과 변경
  }
  @media (max-width: 1024px) {
    width: 100%; // 모바일 또는 작은 화면에서는 전체 너비를 사용
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto; // Fixed height for images
  overflow: hidden;
  border-radius: 8px; // Optional: if you want rounded corners for images
  img {
    width: 100%;
    height: 100%;
    object-fit: contain; // Adjust to contain to avoid cropping
  }
`;
const StyledH3 = styled.h3`
  font-size: 1rem;
  color: #333;
  margin: 5px;
  font-weight: 500;
`;

const StyledP = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
`;

const TextContent = styled.div`
  flex: 1; // Take up the remaining space after ImageContainer
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; // Align text to the start
  justify-content: center; // Distribute space evenly
  gap: 4px; // Keep a small gap between text elements
  padding: 0 5px; // Add padding if needed
  height: 120px; // Fixed height to ensure uniform size across cards
`;

const ReviewButton = styled.button`
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export default MyPageSidebar;
