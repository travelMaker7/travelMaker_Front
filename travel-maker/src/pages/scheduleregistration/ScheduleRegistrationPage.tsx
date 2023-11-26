import styled, { createGlobalStyle } from "styled-components"
import React, { SetStateAction } from 'react';
import MapContainer from '../../components/scheduleregistration/MapContainer'
import DateRange from "../../components/scheduleregistration/DateRange";
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from "react";
import ToggleList from '../../components/scheduleregistration/ToggleList'
import { HeaderComponent } from "../detailmapping/HeaderComponent";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";
import { clearScreenDown } from "readline";

interface EntireData {
  scheduleName: string;
  schedules: ScheduledData[];
  scheduleDescription: string;
  chatUrl: string;
}

interface ScheduledData {
  scheduledDate: string;
  details: PlaceDetailData[];
}

interface PlaceDetailData {
  destinationName: string;
  wishCnt: number | null;
  wishJoin: boolean;
  address: string;
  arriveTime: string | null;
  leaveTime: string | null;
  region: string;
  destinationX: string;
  destinationY: string;
}

const initialData: EntireData = {
  scheduleName: "",
  schedules: [
    {
      scheduledDate: "",
      details: [
        {
          destinationName: "",
          wishCnt: null,
          wishJoin: false,
          address: "",
          arriveTime: null,
          leaveTime: null,
          region: "",
          destinationX: "",
          destinationY: "",
        },
      ],
    },
  ],
  scheduleDescription: "",
  chatUrl: "",
};

export interface PlacesProps {
  destinationName: string;
  address: string;
  region: string;
  arriveTime: string | null;
  leaveTime: string | null;
  wishJoin: boolean;
  wishCnt: number | null;
  destinationX: string;
  destinationY: string;
  placeStates: boolean;
}

export interface SchedulesProps {
  day: number;
  scheduleDate: string;
  places: PlacesProps[];
  dayStates: boolean;
}

export interface DataControlProps {
  accompanyOption: string;
  setAccompanyOption: React.Dispatch<SetStateAction<string>>;
  accompanyCnt: number;
  setAccompanyCnt: React.Dispatch<SetStateAction<number>>;
  autoSchedules: SchedulesProps[];
  setAutoSchedules: React.Dispatch<SetStateAction<SchedulesProps[]>>;
  selectedTimeRange: [Dayjs | null, Dayjs | null] | null;
  setSelectedTimeRange: React.Dispatch<React.SetStateAction<[Dayjs | null, Dayjs | null] | null>>;
  handleTimeRangeChange: (value: [Dayjs | null, Dayjs | null] | null, dateString: string[]) => void;
}

export interface XYDataProps {
  xyData: [string, string][];
  setXyData: React.Dispatch<React.SetStateAction<[string, string][]>>; 
}


const ScheduleRegistrationPage = () => {
  
  const [selectedRange, setSelectedRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [dayCnt, setDayCnt] = useState<number | null>(null);
  const [scheduleName, setScheduleName] = useState<string>("");
  const [schduleDescription, setScheduleDescription] = useState<string>("");
  const [entireData, setEntireData] = useState<EntireData>(initialData);
  const [chatUrl, setChatUrl] = useState<string>("");
  const [autoSchedules, setAutoSchedules] = useState<SchedulesProps[]>([]);
  const [accompanyOption, setAccompanyOption] = useState<string>("true");
  const [accompanyCnt, setAccompanyCnt] = useState<number>(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs | null, Dayjs | null] | null>([null, null]);
  const [arriveTime, setArriveTime] = useState<string | null>(null);
  const [leaveTime, setLeaveTime] = useState<string | null>(null);
  const [xyData, setXyData] = useState<[string, string][]>([]);

  const handleChatUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentUrl = e.target.value;
    setChatUrl(currentUrl);
  }

  const handleDestinationName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentDestinationName = e.target.value;
    setScheduleName(currentDestinationName);
  }

  const handleScheduleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const currentScheduleDescription = e.target.value;
    setScheduleDescription(currentScheduleDescription);
  }
  
  const calcDayCnt = (selectedRange: [Dayjs | null, Dayjs | null] | null) => {
    if (selectedRange !== null && selectedRange[0] !== null && selectedRange[1] !== null) {
      let startDay = selectedRange[0];
      let endDay = selectedRange[1];
      let calcDay = endDay.diff(startDay, 'day') + 1;
      setDayCnt(calcDay);
    } else return
  }

  const handleRangeChange = (selectedRange: [Dayjs | null, Dayjs | null] | null) => {
    setSelectedRange(selectedRange);
    calcDayCnt(selectedRange);
  };

  const disabledDate = (current: Dayjs | null) => {
    if (current === null) return false;
  
    // 현재 날짜보다 이전이면 선택 가능
    if (dayjs(current).isBefore(dayjs(), 'day')) {
      return true;
    }
  
    // 현재 날짜로부터 30일 이내이면 선택 가능
    const maxSelectableDate = dayjs().add(29, 'day');
    return dayjs(current).isAfter(maxSelectableDate, 'day');
  };

  useEffect(() => {
    console.log(selectedRange);
    console.log(dayCnt);
  }, [selectedRange, dayCnt]);

  const handleEntireDataSubmit = () => {
    const entireData: EntireData = {
      scheduleName: scheduleName,
      schedules: autoSchedules.map((_, index) => ({
        scheduledDate: autoSchedules[index].scheduleDate,
        details: autoSchedules[index].places.map((_, placeIndex) => ({
          destinationName: autoSchedules[index].places[placeIndex].destinationName,
          wishCnt: autoSchedules[index].places[placeIndex].wishCnt,
          wishJoin: autoSchedules[index].places[placeIndex].wishJoin,
          address: autoSchedules[index].places[placeIndex].address,
          arriveTime: autoSchedules[index].places[placeIndex].arriveTime,
          leaveTime: autoSchedules[index].places[placeIndex].leaveTime,
          region: autoSchedules[index].places[placeIndex].region,
          destinationX: autoSchedules[index].places[placeIndex].destinationX,
          destinationY: autoSchedules[index].places[placeIndex].destinationY,
        })),
      })),
      scheduleDescription: schduleDescription,
      chatUrl: chatUrl,
    };

    console.log("entireData1: ", entireData);

    axios.post('https://sosak.store/api/v1/schedule', entireData, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`,
        "Content-type": "application/json"
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("전송 성공");
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  const handleTimeRangeChange = (value: [Dayjs | null, Dayjs | null] | null, dateString: string[]) => {
    
    if (value !== null && value[0] !== null && value[1] !== null) {
      setSelectedTimeRange(value);
      setArriveTime(value[0].format('HH:mm'));
      setLeaveTime(value[1].format('HH:mm'));
      console.log('arrive: ', arriveTime);
      console.log('leave: ', leaveTime);
    }
  };

  return (
    <>
      <HeaderComponent/>
      <PageContainer>
        <MapContainerBox>
          <MapContainer xyData={xyData} setXyData={setXyData}/>
        </MapContainerBox>
        <InputContainer>
          <ScheduleDiv>
            <InputHeaderDiv>
              <ScheduleTheme>일정 제목</ScheduleTheme>
              <ScheduleThemeInput
                placeholder="15자 이내로 입력해주세요."
                value={scheduleName}
                onChange={handleDestinationName}
              />
              <ScheduleSubmitBtn onClick={handleEntireDataSubmit}>일정 등록</ScheduleSubmitBtn>
            </InputHeaderDiv>
            <DatePickerDiv>
              <CalendarMonthIcon style={{marginLeft: '5rem', color: 'white', marginRight: '0.8rem'}}/>
              <DateRange 
                selectedRange={selectedRange} 
                setSelectedRange={setSelectedRange}
                dayCnt={dayCnt}
                disabledDate={disabledDate}
                handleRangeChange={handleRangeChange}
                calcDayCnt={calcDayCnt}
              />
            </DatePickerDiv>
            <ScrollDiv>
              <ToggleList 
                selectedRange={selectedRange} 
                dayCnt={dayCnt}
                accompanyCnt={accompanyCnt}
                accompanyOption={accompanyOption}
                setAccompanyCnt={setAccompanyCnt}
                setAccompanyOption={setAccompanyOption}
                autoSchedules={autoSchedules}
                setAutoSchedules={setAutoSchedules}
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
                handleTimeRangeChange={handleTimeRangeChange}
                xyData={xyData}
                setXyData={setXyData}
              />
            </ScrollDiv>
          </ScheduleDiv>
          <ChatUrlDiv>
            <ChatUrlThemDiv>오픈 채팅 URL</ChatUrlThemDiv>
            <ChatUrlInput type="text" placeholder="오픈 채팅 URL" value={chatUrl} onChange={handleChatUrl}></ChatUrlInput>
          </ChatUrlDiv>
          <DescriptionDiv>
            <DescriptionTheme>소개글</DescriptionTheme>
            <DescriptionTextera
              placeholder="간단한 일정 소개를 부탁드려요!!"
              value={schduleDescription}
              onChange={handleScheduleDescription}
            />
          </DescriptionDiv>
        </InputContainer>
      </PageContainer>
    </>
  );
};

export default ScheduleRegistrationPage;

const PageContainer = styled.div`
  width: 62.5rem;
  height:43.75rem;
  display: flex;
  margin: auto;
  border-radius: 0.125rem;
`

const MapContainerBox = styled.div`
  width: 31.25rem;
  height: 43.75rem;
`

const InputContainer = styled.div`
  width: 31.25rem;
  height: 43.75rem;
  display: flex;
  flex-direction: column;
`

const InputHeaderDiv = styled.div`
  width: 31.25rem;
  height: 4rem;
  display: flex;
  align-items: center;
  background-color: #74b9ff;
`
const ScheduleTheme = styled.div`
  width: 6rem;
  height: 2.5rem;
  text-align: center;
  font-weight: bolder;
  color: black;
  line-height: 2.5rem;
  font-size: 1.125rem;
  color: white;
  margin-left: 1rem;
`
const ScheduleThemeInput = styled.input`
  border: none;
  width: 16.625rem;
  height: 2rem;
  text-indent: 1rem;
  font-size: 1.125rem;
  border-radius: 0.375rem;
`

const ScheduleSubmitBtn = styled.button`
  width:5.2rem;
  height: 2.5rem;
  background-color: #8CC4F8;
  color: white;
  border-radius: 0.875rem;
  cursor: pointer;
  font-weight: bolder;
  border: none;
  font-size: 1rem;
  margin-left: 1rem;
`

const DatePickerDiv = styled.div`
  width: 31.25rem;
  height: 4rem;
  display: flex;
  align-items: center;
  background-color: #74b9ff ;
`
const ScheduleDiv = styled.div`
  width: 100%;
  height: 28.75rem;
`

const ScrollDiv = styled.div`
  width: 31.25rem;
  height: 19.75rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-top: 0.875rem;
  box-sizing: border;
  /* -ms-overflow-style: none; 인터넷 익스플로러 
  scrollbar-width: none; 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
`

const DescriptionDiv = styled.div`
  width: 100%;
  height: 11rem;
  margin-top: 1rem;
`

const DescriptionTheme = styled.div`
  width: 100%;
  height: 2rem;
  text-align: center;
  font-weight: bolder;
  color: white;
  line-height: 2rem;
  font-size: 1rem;
  background-color: #8CC4F8;
`

const DescriptionTextera = styled.textarea`
  width: 100%;
  height: 9rem;
  text-indent: 0.5rem;
  border: 0.0625rem #ebebeb solid;
  box-sizing: border-box;
  
  &::placeholder {
    text-align: center;
    line-height: 9rem;
  }

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
`

const ChatUrlDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`
const ChatUrlThemDiv = styled.div`
  width: 9rem;
  height: 1.5rem;
  font-weight: bolder;
  line-height: 1.5rem;
  margin: 0.75rem;
`

const ChatUrlInput = styled.input`
  width: 100%;
  height: 1.5rem;
  border: 0.0625rem #ebebeb solid;
  outline: none;
  background-color: transparent;
  text-indent: 0.75rem;
`
