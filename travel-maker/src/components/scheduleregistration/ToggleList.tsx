import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeProps {
  selectedRange: [Dayjs | null, Dayjs | null] | null;
  dayCnt: number | null;
}

const ToggleList: React.FC<DateRangeProps> = ({ selectedRange, dayCnt }) => {

  const [autoSchedules, setAutoSchedules] = useState<{ day: number; scheduleDate: string; }[]>([]);

  useEffect(() => {
    if (dayCnt !== null && dayCnt > 0) {
      const newAutoSchedules = [];
      for (let i = 0; i < dayCnt; i++) {
        if (selectedRange !== null && selectedRange[0] !== null && selectedRange[1] !== null) {
          const currentDate = selectedRange[0].add(i, 'day');
          const schedule = {
            day: i + 1,
            scheduleDate: currentDate.format('YYYY-MM-DD'),
          };
          newAutoSchedules.push(schedule);
        }
          if (JSON.stringify(autoSchedules) !== JSON.stringify(newAutoSchedules)) {
            setAutoSchedules(newAutoSchedules);
          }
      }
    }
  }, [dayCnt, selectedRange]);

  useEffect(() => {
    console.log(autoSchedules);
  }, [autoSchedules]);

  // const addPlace = () => {
  //   axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,{
  //     headers: { Authorization: `KakaoAK ${process.env.VITE_KAKAOLOCALRESTKEY}` }
  //   }).then((res) => {
  //     console.log(res);
  //   })
  // }

  return (
    <>
      {autoSchedules.map((schedule) => (
        <DayToggleList key={schedule.day}>
          <DayThemeDiv>
            <WbSunnyIcon style={{ color: 'white', width: '1.25rem' , height: '1.25rem', marginLeft: '0.5rem' }}/>
            <DayDiv>Day</DayDiv>
            <CountDayDiv>{schedule.day}</CountDayDiv>
          </DayThemeDiv>
          <DateDiv>
            {dayjs(schedule.scheduleDate).format("YYYY년 MM월 DD일")}
          </DateDiv>
          <DayTogglebutton>
            <ArrowForwardIosIcon style={{ color: '#8cc3f8', marginLeft: '14rem' }}/>
          </DayTogglebutton>
        </DayToggleList>
      ))}
    </>
  );  

};

export default ToggleList;

const DayToggleList = styled.div`
  width: 31.25rem;
  height: 3.75rem;
  display : flex;
  align-items: center;
`

const DayTogglebutton = styled.button`
  border: none;
  width: 3rem;
  height: 3rem;
  text-align: center;
  background-color: white;
  right: 0;
`

const DayThemeDiv = styled.div`
  width: 5.5rem;
  height: 2rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  background-color: #00315e;
  margin-left: 1rem;
  font-size: 0.95rem;
`

const DayDiv = styled.div`
  color: white;
  text-align: center;
  line-height: 0.75rem;
  border: none;
  margin-left: 0.35rem;
`

const CountDayDiv = styled.div`
  color: white;
  text-align: center;
  margin-left: 0.25rem;
`

// const PlaceSearchDiv = styled.div`
//   width: 100%;
//   height: 3rem;
//   border: none;
// `

// const PlaceSearchTheme = styled.div`
//   width: 5rem;
//   height: 2.5rem;
//   border: none;
// `

// const PlaceDetailAddress = styled.input`
//   width: 20rem;
//   height: 2.5rem;
//   border: 1px #ebebeb solid; 
// `

// const PlaceSearchButton = styled.button`
//   width: 5rem;
//   height: 2.5rem;
//   background-color: #8CC4F8;
//   color: white;
//   border-radius: 0.875rem;
//   border: none;
// `

const DateDiv = styled.div`
  width: 9rem;
  color: #d5d1d1;
  font-size: 0.9rem;
`

// const AccompanyPeopleDiv = styled(PlaceSearchDiv)`
// ` 

// const AccompanyPeopleTheme = styled(PlaceSearchTheme)`
// `

// const AccompanyPeopleSelect = styled.select`
//   width: 5rem;
//   height: 2.5rem;
//   background-color: #ebebeb;
//   border: none;
//   border-radius: 0.125rem;
// `

// const PlaceAddDiv = styled(PlaceSearchDiv)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const PlaceAddButton = styled.button`
//   width: 6rem;
//   height: 3rem;
//   background-color: #8CC4F8;
//   color: white;
//   border-radius: 0.875rem;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
// const DeleteIconDiv = styled.div`
//   width: 3rem;
//   height: 3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: 15rem;
// `

// const EditIconDiv = styled(DeleteIconDiv)``;

