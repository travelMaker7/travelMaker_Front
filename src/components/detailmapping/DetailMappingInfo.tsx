import { MarkerData, ScheduleDetail } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  faMap,
  faClock,
  faUsers,
  faCalendar,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

interface Props {
  setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
  activeScheduledDate: string | null;
  setActiveScheduledDate: React.Dispatch<React.SetStateAction<string | null>>;
}

export const DetailMappingInfo: React.FC<Props> = ({
  setMarkers,
  activeScheduledDate,
  setActiveScheduledDate,
}) => {
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail | null>(
    null
  );

  const { scheduleId } = useParams<{ scheduleId: string }>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fetchScheduleDetail = async () => {
    try {
      const res = await axios.get(
        `https://sosak.store/api/v1/schedule/detail/${scheduleId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response.data: ", res);
      const Markers = res.data.data.markers.map((marker: MarkerData[]) => ({
        ...marker,
      }));
      setMarkers(Markers);
      setScheduleDetail(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchScheduleDetail();
  }, [scheduleId]);

  const toggleSideInfo = (scheduledDate: string) => {
    setActiveScheduledDate((prevDate) =>
      prevDate === scheduledDate ? null : scheduledDate
    );
  };

  if (!scheduleDetail) {
    return null;
  }

  const { tripPlans, scheduleName, scheduleDescription, chatUrl, hostId } =
    scheduleDetail;

  const handleJoinRequest = async (tripPlanId: number, hostId: number) => {
    setIsButtonDisabled(true);
    try {
      const response = await axios.post(
        "https://sosak.store/api/v1/accompany/guest",
        {
          tripPlanId,
          hostId,
          joinStatus: "승인대기",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("response.data : ", response.data);

      if (response.status === 200) {
        alert("동행신청이 완료되었습니다.");
      } else {
        alert("동행신청에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      console.log();
      alert("동행신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <ScheduleName>{scheduleName}</ScheduleName>
      <DateContainer>
        <InfoIcon>
          <FontAwesomeIcon icon={faCalendar} style={{ color: "#6FADFF" }} />
        </InfoIcon>
        <InfoDateText>
          {tripPlans[0].scheduledDate} ~{" "}
          {tripPlans[tripPlans.length - 1].scheduledDate}
        </InfoDateText>
      </DateContainer>
      {tripPlans.map((plan) => (
        <DateSection key={plan.scheduledDate}>
          <DateToggleContainer>
            <DateText>{plan.scheduledDate}</DateText>
            <ToggleButton
              className={activeScheduledDate === plan.scheduledDate ? "on" : ""}
              onClick={() => toggleSideInfo(plan.scheduledDate)}
            >
              <FontAwesomeIcon
                icon={
                  activeScheduledDate === plan.scheduledDate
                    ? faAngleUp
                    : faAngleDown
                }
              />
            </ToggleButton>
          </DateToggleContainer>

          {activeScheduledDate === plan.scheduledDate &&
            plan.tripPlanDetails.map((detail) => (
              <SideInfoContainer key={detail.tripPlanId}>
                <InfoItemContainer>
                  <InfoIcon>
                    <FontAwesomeIcon
                      icon={faMap}
                      style={{ color: "#6FADFF" }}
                    />
                  </InfoIcon>
                  <InfoText>{detail.destinationName}</InfoText>
                </InfoItemContainer>
                <ContentContainer isSideInfoVisible={true}>
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
                    <InfoText>{`동행 인원: ${detail.joinCnt}/${detail.wishCnt}`}</InfoText>
                  </InfoItemContainer>
                  <JoinButton
                    isVisible={true}
                    onClick={() => handleJoinRequest(detail.tripPlanId, hostId)}
                    disabled={isButtonDisabled || detail.overWish}
                  >
                    {isButtonDisabled || detail.overWish
                      ? "신청불가"
                      : "동행신청"}
                  </JoinButton>
                </ContentContainer>
              </SideInfoContainer>
            ))}
        </DateSection>
      ))}
      <MemoBox>{scheduleDescription}</MemoBox>
      <OpenChatBox>{chatUrl}</OpenChatBox>
    </>
  );
};

const ScheduleName = styled.h3`
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  background-color: #00bfff; // 원하는 배경색으로 설정
  color: #fff; // 원하는 글자색으로 설정
  height: 40px;
  display: flex;
  align-items: center; // 수직 가운데 정렬
  justify-content: center; // 수평 가운데 정렬
  padding: 0 10px;
  margin: 0 0 20px 0;
  /* border-radius: 10px; */
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
`;

const DateContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  font-family: Inter;
  font-size: 18px;
  margin-bottom: 15px;
  padding: 10px 0;
  background-color: #fff;
  /* box-shadow: 2px 2px 2px 2px rgba(122, 122, 130, 0.25); */
`;

const ContentContainer = styled.div<{ isSideInfoVisible: boolean }>`
  transition: max-height 0.3s ease-in-out;
  max-height: ${(props) => (props.isSideInfoVisible ? "280px" : "0px")};
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #6fadff;
  }

  &.on {
    transform: rotate(180deg);
  }
`;

const SideInfoContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
  position: relative;
  background-color: #00bfff21;
  /* border: 1px solid #0c0808; */
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
`;

const DateSection = styled.div`
  margin-bottom: 20px;
`;

const DateToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  /* border-radius: 10px; */
  margin-bottom: 10px;
  border-left: 2px solid #00bfff;
  /* box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25); */
`;

const DateText = styled.span`
  font-family: Inter;
  font-size: 16px;
  color: #333;
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

const InfoDateText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OpenChatBox = styled.div`
  padding: 15px;
  margin-top: 20px;
  font-family: Inter;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinButton = styled.button<{ isVisible: boolean; disabled?: boolean }>`
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#6fadff" : "#fff")};
    color: ${(props) => (props.disabled ? "#fff" : "var(--blue-200, #6fadff)")};
    border: ${(props) => (props.disabled ? "none" : "1px solid #6fadff")};
  }

  /* additional styles for disabled state if needed */
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
