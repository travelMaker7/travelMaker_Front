import {
  // ButtonProps,
  ParticipatingSchedule,
  RegisteredSchedule,
} from "@/utils/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationsList from "./NotificationsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

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
export interface ButtonProps {
  isActive: boolean;
}
const ScheduleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("registered");
  // const [registeredSchedules, setRegisteredSchedules] = useState<[]>([]);
  // const [participatingSchedules, setParticipatingSchedules] = useState<[]>([]);
  const [registeredSchedules, setRegisteredSchedules] = useState<
    RegisteredSchedule[]
  >(mockRegisteredSchedules);
  const [participatingSchedules, setParticipatingSchedules] = useState<
    ParticipatingSchedule[]
  >(mockParticipatingSchedules);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMouseEnter = () => setShowDeleteButton(true);
  const handleMouseLeave = () => setShowDeleteButton(false);

  const deleteSchedule = async (tripPlanId: string) => {
    try {
      const response = await axios.delete(
        `/api/v1/accompany/guest/${tripPlanId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 201) {
        console.log("일정 삭제 성공");
        setParticipatingSchedules((prev) =>
          prev.filter((s) => s.scheduleId !== tripPlanId)
        );
      } else {
        console.log("일정 삭제 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDeleteClick = (tripPlanId: string) => {
    setSelectedScheduleId(tripPlanId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedScheduleId) {
      await deleteSchedule(selectedScheduleId);
      setShowDeleteModal(false);
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
    <TabsContainer>
      <NotificationTabButton onClick={() => setActiveTab("notifications")}>
        <FontAwesomeIcon icon={faBell} />
      </NotificationTabButton>
      <MainTabsContainer>
        <TabButton
          onClick={() => setActiveTab("registered")}
          isActive={activeTab === "registered"}
        >
          등록한 일정
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("승인대기")}
          isActive={activeTab === "승인대기"}
        >
          참여 대기중
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("신청수락")}
          isActive={activeTab === "신청수락"}
        >
          참여 예정
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("동행완료")}
          isActive={activeTab === "동행완료"}
        >
          참여 완료
        </TabButton>
      </MainTabsContainer>
      <SchedulesContainer>
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
                {showDeleteButton && (
                  <DeleteButton
                    onClick={() => handleDeleteClick(schedule.tripPlanId)}
                  >
                    X
                  </DeleteButton>
                )}
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

        {activeTab === "notifications" && <NotificationsList />}
      </SchedulesContainer>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </TabsContainer>
  );
};

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => (
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

// 스타일드 컴포넌트 정의

const TabsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  border-top: 2px solid #83d2ef;
`;

const MainTabsContainer = styled.div``;

const TabButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => (props.isActive ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};
  border-bottom: ${(props) => (props.isActive ? "3px solid #2980b9" : "none")};
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;
const NotificationTabButton = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    color: #3359de;
    border: 1px solid #6fadff;
    transform: scale(1.1);
  }
`;

const SchedulesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
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
  height: auto; // 높이 자동 조정
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
const StyledH3 = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const StyledP = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;
const ImageContainer = styled.div`
  flex: 2; // 더 큰 비율을 위해 변경
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const TextContent = styled.div`
  flex: 1; // 더 작은 비율을 위해 변경
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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

const DeleteButton = styled.button`
  position: absolute;
  background-color: transparent;
  top: 12px;
  right: 12px;
  color: #3498db;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #3498db;
  }
`;

export default ScheduleTabs;
