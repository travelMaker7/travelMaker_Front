import styled from "styled-components"
import React from 'react';
import MapContainer from "@/components/scheduleregistration/MapContainer";

const ScheduleRegistrationPage = () => {
  
  return (
    <PageContainer>
      <MapContainerBox>
        <MapContainer/>
      </MapContainerBox>
      <InputContainer>
        <ScheduleDiv>
          <FixedDiv>
            <InputHeaderDiv>
              <ScheduleTheme>일정 제목</ScheduleTheme>
              <ScheduleThemeInput
                placeholder="15자 이내로 입력해주세요."
              />
              <ScheduleSubmitBtn>일정 등록</ScheduleSubmitBtn>
            </InputHeaderDiv>
            <DatePickerDiv>
            </DatePickerDiv>
          </FixedDiv>
          <ScrollDiv></ScrollDiv>
        </ScheduleDiv>
        <PlaceAddBtnDiv>
          <PlaceAddBtn>장소 추가</PlaceAddBtn>
        </PlaceAddBtnDiv>
        <OpenChattingDiv>
          <OpenChattingTheme>오픈 카톡 URL</OpenChattingTheme>
          <OpenChattingInput/>
        </OpenChattingDiv>
        <DescriptionDiv></DescriptionDiv>
      </InputContainer>
    </PageContainer>
  );
};

export default ScheduleRegistrationPage;

const PageContainer = styled.div`
  width: 62.5rem;
  height:43.75rem;
  border: 1px black solid;
  margin: auto;
  display: flex;
`

const MapContainerBox = styled.div`
  width: 31.25rem;
  height: 43.75rem;
  border: 1px red solid;
`

const InputContainer = styled.div`
  width: 31.25rem;
  height: 43.75rem;
  border: 1px blue solid;
  display: flex;
  flex-direction: column;
`

const InputHeaderDiv = styled.div`
  width: 31.25rem;
  height: 4rem;
  border: 1px blue solid;
  display: flex;
  align-items: center;
`
const FixedDiv = styled.div`
  width: 31.25rem;
  height: 8rem;
  border: 1px gray solid;
  position: fixed;
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
  width: 15rem;
  height: 2.5rem;
  text-indent: 1rem;
  font-size: 1.125rem;
  border-radius: 0.625rem;
  margin-left: 0.5rem;
`

const ScheduleSubmitBtn = styled.button`
  width:6rem;
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
  border: 1px purple solid;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ScheduleDiv = styled.div`
  width: 100%;
  height: 28.75rem;
  border: 1px green solid;
`

const ScrollDiv = styled.div`
  width: 31.25rem;
  height: 18.75rem;
  margin-top: 8rem;
  overflow-y: scroll;
  /* -ms-overflow-style: none; 인터넷 익스플로러 
  scrollbar-width: none; 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
`

const PlaceAddBtnDiv = styled.div`
  width: 100%;
  height: 5rem;
  border: 1px salmon solid;
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
  border: 1px purple solid;
  overflow-y: scroll;
`

const OpenChattingDiv = styled(InputHeaderDiv)``

const OpenChattingTheme = styled.div`
  width: 10rem;
  height: 2.5rem;
  text-align: center;
  font-weight: bolder;
  color: black;
  line-height: 2.5rem;
  font-size: 1.25rem;
`

const OpenChattingInput = styled(ScheduleThemeInput)``
