import {
  MarkerData,
  ScheduleDetail,
  TripPlan,
  EnhancedMarkerData,
} from "@/utils/Types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  faMap,
  faClock,
  faUsers,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JoinRequestButton from "./JoinRequestButton";

const SCHEDULE_DETAIL_MOCK = {
  status: 201,
  message: "일정 상세보기 조회 성공",
  data: {
    scheduleId: 1,
    markers: [
      { destinationY: "37.5797", destinationX: "126.977" },
      { destinationY: "37.582441", destinationX: "126.977060" },
      { destinationY: "37.579772", destinationX: "126.975890" },
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
            overWish: true,
          },
          {
            tripPlanId: 2,
            destinationName: "잘생긴",
            wishCnt: 3,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "18:00",
            leaveTime: "19:00",
            overWish: false,
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
            overWish: true,
          },
        ],
      },
    ],
    chatUrl: "https://open.kakao.com/o/s5E3AYof",
  },
};

interface Props {
  setMarkers: React.Dispatch<React.SetStateAction<EnhancedMarkerData[]>>;
  activeTripPlanId: number | null;
  setActiveTripPlanId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DetailMappingInfo: React.FC<Props> = ({
  setMarkers,
  activeTripPlanId,
  setActiveTripPlanId,
}) => {
  // const [activeTripPlanId, setActiveTripPlanId] = useState<number | null>(null);
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail | null>(
    null
  );

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      const scheduleId = 1;
      try {
        const res = await axios.get(`/api/v1/schedule/detail/${scheduleId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const allDetails = res.data.data.tripPlans.flatMap(
          (plan: TripPlan) => plan.details
        );
        const enhancedMarkers = res.data.data.makers.map(
          (marker: MarkerData, index: number) => ({
            ...marker,
            tripPlanId: allDetails[index]?.tripPlanId,
          })
        );

        setMarkers(enhancedMarkers);
        setScheduleDetail(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchScheduleDetail();
  }, []);

  useEffect(() => {
    const allDetails = SCHEDULE_DETAIL_MOCK.data.tripPlans.flatMap(
      (plan) => plan.details
    );
    const enhancedMarkers = SCHEDULE_DETAIL_MOCK.data.markers.map(
      (marker, index) => ({
        ...marker,
        tripPlanId: allDetails[index].tripPlanId,
      })
    );

    setMarkers(enhancedMarkers);
    setScheduleDetail(SCHEDULE_DETAIL_MOCK.data);
  }, []);

  const toggleSideInfo = (tripPlanId: number) => {
    setActiveTripPlanId((prevId) =>
      prevId === tripPlanId ? null : tripPlanId
    );
  };

  if (!scheduleDetail) {
    return null;
  }

  const { startDate, finishDate, tripPlans, scheduleName, chatUrl } =
    scheduleDetail;
  // const { startDate, finishDate, tripPlans, scheduleName, chatUrl } =
  //   SCHEDULE_DETAIL_MOCK.data;

  return (
    <>
      <ScheduleName>{scheduleName}</ScheduleName>
      <DateContainer>
        <InfoIcon>
          <FontAwesomeIcon icon={faCalendar} style={{ color: "#6FADFF" }} />
        </InfoIcon>
        <InfoDateText>
          {startDate} ~ {finishDate}
        </InfoDateText>
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
                  <InfoIcon>
                    <FontAwesomeIcon
                      icon={faMap}
                      style={{ color: "#6FADFF" }}
                    />
                  </InfoIcon>
                  <InfoText>{detail.destinationName}</InfoText>
                  <InfoData>{plan.dateNum}</InfoData>
                </InfoItemContainer>
                <ContentContainer
                  isSideInfoVisible={activeTripPlanId === detail.tripPlanId}
                >
                  <InfoItemContainer>
                    <InfoIcon>
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#6FADFF" }}
                      />
                    </InfoIcon>
                    <InfoText>{`${detail.arriveTime} ~ ${detail.leaveTime}`}</InfoText>
                  </InfoItemContainer>
                  <InfoItemContainer>
                    <InfoIcon>
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ color: "#6FADFF" }}
                      />
                    </InfoIcon>
                    <InfoText>{`동행 인원: ${detail.wishCnt}/4`}</InfoText>
                  </InfoItemContainer>
                  <JoinRequestButton
                    tripPlanId={detail.tripPlanId}
                    overWish={detail.overWish}
                    isVisible={activeTripPlanId === detail.tripPlanId}
                  />
                </ContentContainer>
              </SideInfoContainer>
            )
        )
      )}
      <MemoBox>{chatUrl}</MemoBox>
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
  /* align-items: center; */
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
  margin-right: 10px;
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

const MemoBox = styled.div`
  height: 100px;
  padding: 15px;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  font-family: Inter;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const InfoData = styled.div`
  font-family: Inter;
  font-size: 12px;
  margin-right: 20px;
  color: #757575;
  flex: 1;
  text-align: right;
`;

const InfoDateText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
