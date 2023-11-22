import styled from "styled-components"
import React from 'react';
import MapContainer from '../../components/scheduleregistration/MapContainer'
import DateRange from "../../components/scheduleregistration/DateRange";
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from "react";
import ToggleList from '../../components/scheduleregistration/ToggleList'
import { HeaderComponent } from "../detailmapping/HeaderComponent";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";

const ScheduleRegistrationPage = () => {
  
  const [selectedRange, setSelectedRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [dayCnt, setDayCnt] = useState<number | null>(null);

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

  const handleSubmit = () => {
    axios.post('http://121.178.106.179:8080/api/v1/schedule', null,{})
  .then((res) => {
    console.log(res);
    console.log("제출 성공");
  }).catch((error) => {
    console.error("제출 실패");
  })
  }

  return (
    <>
      <HeaderComponent/>
      <PageContainer>
        <MapContainerBox>
          <MapContainer/>
        </MapContainerBox>
        <InputContainer>
          <ScheduleDiv>
            <InputHeaderDiv>
              <ScheduleTheme>일정 제목</ScheduleTheme>
              <ScheduleThemeInput
                placeholder="15자 이내로 입력해주세요."
              />
              <ScheduleSubmitBtn onClick={handleSubmit}>일정 등록</ScheduleSubmitBtn>
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
              <ToggleList selectedRange={selectedRange} dayCnt={dayCnt} />
            </ScrollDiv>
          </ScheduleDiv>
          <DescriptionDiv>
            <DescriptionTheme>소개글</DescriptionTheme>
            <DescriptionTextera
              placeholder="간단한 일정 소개를 부탁드려요!!"
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
  height: 22.75rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.875rem;
  /* -ms-overflow-style: none; 인터넷 익스플로러 
  scrollbar-width: none; 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
`

const DescriptionDiv = styled.div`
  width: 100%;
  height: 11rem;
  margin-top: 4rem;
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
