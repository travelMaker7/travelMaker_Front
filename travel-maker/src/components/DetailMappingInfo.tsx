import { CalendarIcon, ClockIcon, MapIcon, PeopleIcon } from "@/utils/Icon";
import { ScheduleDetail } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import axios from "axios";

const SCHEDULE_DETAIL_MOCK = {
  status: 201,
  message: "일정 상세보기 조회 성공",
  data: {
    scheduleId: 1,
    makers: [
      { destinationY: "37.5797", destinationX: "126.977" },
      { destinationY: "37.5797", destinationX: "126.977" },
    ],
    scheduleName: "서울 맛집 탐방",
    startDate: "2023-11-21",
    finishDate: "2023-11-22",
    tripPlans: [
      {
        dateNum: "10월 20일",
        details: [
          {
            tripPlanId: 1,
            destinationName: "멋지고",
            wishCnt: 2,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "16:00",
            leaveTime: "18:00",
          },
          {
            tripPlanId: 2,
            destinationName: "잘생긴",
            wishCnt: 3,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "18:00",
            leaveTime: "19:00",
          },
        ],
      },
      {
        dateNum: "10월 21일",
        details: [
          {
            tripPlanId: 3,
            destinationName: "수민이",
            wishCnt: 2,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "16:00",
            leaveTime: "18:00",
          },
          {
            tripPlanId: 4,
            destinationName: "",
            wishCnt: 3,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "18:00",
            leaveTime: "19:00",
          },
        ],
      },
    ],
    chatUrl: "https://open.kakao.com/o/s5E3AYof",
  },
};

export const DetailMappingInfo: React.FC = () => {
  const [activeTripPlanId, setActiveTripPlanId] = useState<number | null>(null);
  // const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail | null>(
  //   null
  // );

  // useEffect(() => {
  //   const fetchScheduleDetail = async () => {
  //     const scheduleId = 1;
  //     try {
  //       const res = await axios.get(`/api/v1/schedule/detail/${scheduleId}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log(res);
  //       setScheduleDetail(res.data.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchScheduleDetail();
  // }, []);

  const toggleSideInfo = (tripPlanId: number) => {
    setActiveTripPlanId((prevId) =>
      prevId === tripPlanId ? null : tripPlanId
    );
  };

  // if (!scheduleDetail) {
  //   return null;
  // }

  // const { startDate, finishDate, tripPlans, scheduleName } = scheduleDetail;
  const { startDate, finishDate, tripPlans, scheduleName } =
    SCHEDULE_DETAIL_MOCK.data;

  return (
    <>
      <ScheduleName>{scheduleName}</ScheduleName>
      <DateContainer>
        <InfoIcon>{CalendarIcon}</InfoIcon>
        <div>
          {startDate} ~ {finishDate}
        </div>
      </DateContainer>
      {tripPlans.map((plan) =>
        plan.details.map(
          (detail) =>
            detail.destinationName && (
              <SideInfoContainer key={detail.tripPlanId}>
                <InfoItemContainer>
                  <ToggleButton
                    className={
                      activeTripPlanId === detail.tripPlanId ? "on" : ""
                    }
                    onClick={() => toggleSideInfo(detail.tripPlanId)}
                  >
                    ▶
                  </ToggleButton>
                  <InfoIcon>{MapIcon}</InfoIcon>
                  <InfoText>{detail.destinationName}</InfoText>
                  <InfoData>{plan.dateNum}</InfoData>
                </InfoItemContainer>
                <ContentContainer
                  isSideInfoVisible={activeTripPlanId === detail.tripPlanId}
                >
                  <InfoItemContainer>
                    <InfoIcon>{ClockIcon}</InfoIcon>
                    <InfoText>{`${detail.arriveTime} ~ ${detail.leaveTime}`}</InfoText>
                  </InfoItemContainer>
                  <InfoItemContainer>
                    <InfoIcon>{PeopleIcon}</InfoIcon>
                    <InfoText>{`동행 인원: ${detail.wishCnt}/4`}</InfoText>
                  </InfoItemContainer>
                  <JoinButton
                    isVisible={activeTripPlanId === detail.tripPlanId}
                  >
                    동행 신청
                  </JoinButton>
                </ContentContainer>
              </SideInfoContainer>
            )
        )
      )}
      <MemoBox></MemoBox>
    </>
  );
};

const ScheduleName = styled.h3`
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 18px;
  margin-bottom: 15px;
  padding: 10px 0;
`;

const SideInfoContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
  position: relative;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
`;

const ContentContainer = styled.div<{ isSideInfoVisible: boolean }>`
  transition: max-height 0.3s ease-in-out;
  max-height: ${(props) => (props.isSideInfoVisible ? "280px" : "0px")};
  overflow: hidden;
`;

const ToggleButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  color: #6fadff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: auto;

  &:hover {
    color: #3359de;
    border: 1px solid #6fadff;
    transform: scale(1.1);
  }
  &.on {
    transform: rotate(90deg);
  }
`;

const InfoItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto 15px;
`;

const InfoIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  flex: 1;
  text-align: left;
`;

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

const MemoBox = styled.div`
  height: 100px;
  padding: 15px;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  font-family: Inter;
  font-size: 14px;
`;

const InfoData = styled.div`
  font-family: Inter;
  font-size: 12px;
  margin-right: 20px;
  color: #757575;
  flex: 1;
  text-align: right;
`;
