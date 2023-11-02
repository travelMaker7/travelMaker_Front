import styled from "styled-components"
import React from 'react';
import MapContainer from "@/components/scheduleregistration/MapContainer";
import DateRange from "@/components/scheduleregistration/DateRange";
import { useState } from "react";
import { Dayjs } from "dayjs";
// import ToggleList from "../../components/scheduleregistration/ToggleList";

const ScheduleRegistrationPage = () => {
  
  return (
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
            <ScheduleSubmitBtn>일정 등록</ScheduleSubmitBtn>
          </InputHeaderDiv>
          <DatePickerDiv>
            <DateRange/>
          </DatePickerDiv>
          <ScrollDiv>
            {/* <ToggleList/> */}
          </ScrollDiv>
        </ScheduleDiv>
        <OpenChattingDiv>
          <OpenChattingTheme>오픈 카톡 URL</OpenChattingTheme>
          <OpenChattingInput/>
        </OpenChattingDiv>
        <DescriptionDiv>
          <DescriptionTheme>소개글</DescriptionTheme>
          <DescriptionTextera/>
        </DescriptionDiv>
      </InputContainer>
    </PageContainer>
  );
};

export default ScheduleRegistrationPage;

const PageContainer = styled.div`
  width: 62.5rem;
  height:43.75rem;
  margin: auto;
  display: flex;
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
  margin-left: 2rem;
`
const ScheduleTheme = styled.div`
  width: 6rem;
  height: 2.5rem;
  text-align: center;
  font-weight: bolder;
  color: black;
  line-height: 2.5rem;
  font-size: 1.25rem;
  
`
const ScheduleThemeInput = styled.input`
  border: 1px #ebebeb solid;
  width: 16.625rem;
  height: 2.5rem;
  text-indent: 1rem;
  font-size: 1.125rem;
  border-radius: 0.625rem;
  margin-left: 1.5rem;
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
  margin-left: 2.25rem;
`

const DatePickerDiv = styled.div`
  width: 31.25rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
`
const ScheduleDiv = styled.div`
  width: 100%;
  height: 28.75rem;
`

const ScrollDiv = styled.div`
  width: 31.25rem;
  height: 18.75rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
  /* -ms-overflow-style: none; 인터넷 익스플로러 
  scrollbar-width: none; 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
`

const PlaceAddBtnDiv = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: right;
  align-items: center;
` 

const PlaceAddBtn = styled.button`
  width:6rem;
  height: 2.5rem;
  background-color: #8CC4F8;
  color: white;
  border-radius: 0.875rem;
  cursor: pointer;
  font-weight: bolder;
  border: none;
  font-size: 1rem;
  margin-right: 1rem;
`

const DescriptionDiv = styled.div`
  width: 31.25rem;
  height: 6rem;
  margin-left: 2rem;
`

const OpenChattingDiv = styled(InputHeaderDiv)``

const OpenChattingTheme = styled.div`
  width: 7rem;
  height: 2rem;
  text-align: center;
  font-weight: bolder;
  color: black;
  line-height: 2rem;
  font-size: 1rem;
`

const OpenChattingInput = styled.input`
  border: 1px #ebebeb solid;
  width: 18rem;
  height: 1.5rem;
  text-indent: 0.5rem;
  font-size: 1.125rem;
  border-radius: 0.625rem;
  margin-left: 0.5rem;
`

const DescriptionTheme = styled.div`
  width: 4rem;
  height: 2rem;
  text-align: center;
  font-weight: bolder;
  color: black;
  line-height: 2rem;
  font-size: 1rem;
`

const DescriptionTextera = styled.textarea`
  width: 30rem;
  height: 8rem;
  overflow-y: scroll;
  text-indent: 0.5rem;
  border: 0.0625rem #ebebeb solid;
`
