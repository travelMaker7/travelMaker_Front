import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeleteIcon from '@mui/icons-material/Delete';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaceSearchModal from './PlaceSearchModal';

interface DateRangeProps {
  selectedRange: [Dayjs | null, Dayjs | null] | null;
  dayCnt: number | null;
}

interface PlaceProps {
  destinationName: string;
  address: string;
  region: string;
  destinationX: string;
  destinationY: string;
}

const ToggleList: React.FC<DateRangeProps> = ({ selectedRange, dayCnt }) => {
  const [autoSchedules, setAutoSchedules] = useState<{ day: number; scheduleDate: string; }[]>([]);
  const [dayToggleStates, setDayToggleStates] = useState<boolean[]>([]);
  const [placeStates, setPlaceStates] = useState<PlaceProps[]>([]);
  const [placeToggleStates, setPlaceToggleStates] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (dayCnt !== null && dayCnt > 0) {
      const newAutoSchedules = [];
      const newToggleStates = Array(dayCnt).fill(false); // 각각의 토글 상태를 초기화
      for (let i = 0; i < dayCnt; i++) {
        if (selectedRange !== null && selectedRange[0] !== null && selectedRange[1] !== null) {
          const currentDate = selectedRange[0].add(i, 'day');
          const schedule = {
            day: i + 1,
            scheduleDate: currentDate.format('YYYY-MM-DD'),
          };
          newAutoSchedules.push(schedule);
        }
      }
      setDayToggleStates(newToggleStates);
      setAutoSchedules(newAutoSchedules);
      console.log(dayToggleStates);
    }
  }, [dayCnt, selectedRange]);

  const dayToggleHandler = (index: number) => {
    setDayToggleStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index]; // 클릭된 토글 상태를 변경
      return newStates;
    });
  };

  const placeToggleHandler = (placeIndex: number) => {
    setPlaceToggleStates((prev) => {
      const newStates = [...prev];
      newStates[placeIndex] = !newStates[placeIndex]; // 클릭된 토글 상태를 변경
      return newStates;
    });
  };

  const openSearchModal = () => {
    setIsModalOpen(true); // 모달을 열기
  }

  const closeSearchModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      {autoSchedules.map((schedule, index) => (
        <DayToggleContainer isopen={dayToggleStates[index]} key={schedule.day}>
          <DayToggleList>
            <DayThemeDiv>
              <WbSunnyIcon style={{ color: 'white', width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
              <DayDiv>Day</DayDiv>
              <CountDayDiv>{schedule.day}</CountDayDiv>
            </DayThemeDiv>
            <DateDiv>
              {dayjs(schedule.scheduleDate).format("YYYY년 MM월 DD일")}
            </DateDiv>
            <AddLocationButton onClick={openSearchModal}>
              <AddLocationAltIcon 
                style={{ color: '#8cc3f8', marginBottom: '0.25rem', cursor: 'pointer' }}
              />            
            </AddLocationButton>
            <DayDeleteButton>
              <DeleteForeverIcon
                style={{ color: '#8cc3f8', marginBottom: '0.25rem', cursor: 'pointer' }}
              />
            </DayDeleteButton>
            <DayTogglebutton onClick={() => dayToggleHandler(index)}>
              <ArrowForwardIosIcon
                style={{ color: '#8cc3f8', transform: dayToggleStates[index] ? 'rotate(90deg)' : 'rotate(0)', cursor: 'pointer', marginBottom: '0.125rem' }}
              />
            </DayTogglebutton>
          </DayToggleList>
          <DayDetailDiv isopen={dayToggleStates[index]}>
            {placeStates.map((placeState, placeIndex) => (
              <PlaceToggleContainer isopen={placeToggleStates[placeIndex]} key={`${schedule.day}-${placeIndex}`}>
                <PlaceToggleList>
                  <DestinationNameDiv>{placeState.destinationName}</DestinationNameDiv>
                  <PlaceToggleButton onClick={() => placeToggleHandler(placeIndex)}>
                    <ArrowForwardIosIcon
                      style={{ color: '#8cc3f8', transform: placeToggleStates[placeIndex] ? 'rotate(90deg)' : 'rotate(0)' }}
                    />
                  </PlaceToggleButton>
                </PlaceToggleList>
                {placeToggleStates[placeIndex] && (
                  <PlaceDetailDiv isopen={placeToggleStates[placeIndex]}>
                    <WishJoinDiv>동행 여부</WishJoinDiv>
                    <WishCntDiv>동행 인원</WishCntDiv>
                    <TravelTimeDiv>여행 시간</TravelTimeDiv>
                  </PlaceDetailDiv>
                )}
              </PlaceToggleContainer>
            ))}
          </DayDetailDiv>
        </DayToggleContainer>
      ))}
      {isModalOpen && 
        <PlaceSearchModal 
          closeSearchModal={closeSearchModal} 
          placeStates={placeStates} 
          setPlaceStates={setPlaceStates}
          placeToggleStates={placeToggleStates}
          setPlaceToggleStates={setPlaceToggleStates}  
        />}
    </>
  );
};

export default ToggleList;

const DayToggleContainer = styled.div<{isopen: boolean}>`
  width: 31.25rem;
  height: ${(props) => props.isopen ? '21.75rem' : '3.75rem'};
  display: flex;
  flex-direction: column;
`

const DayToggleList = styled.div`
  width: 31.25rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
`;

const DayTogglebutton = styled.button`
  border: none;
  width: 2rem;
  height: 3rem;
  text-align: center;
  background-color: white;
  margin-left: 1rem;
`

const AddLocationButton = styled.button`
  border: none;
  width: 2rem;
  height: 3rem;
  text-align: center;
  margin-left: 8.5rem;
  background-color: white;
`

const DayDeleteButton = styled.button`
  border: none;
  width: 2rem;
  height: 3rem;
  text-align: center;
  background-color: white;
`

const DayThemeDiv = styled.div`
  width: 5.5rem;
  height: 2rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  background-color: #74B9FF;
  margin-left: 1rem;
  font-size: 0.95rem;
`

const DayDiv = styled.div`
  color: white;
  text-align: center;
  line-height: 0.75rem;
  border: none;
  margin-left: 0.35rem;
  font-weight: bolder;
`

const CountDayDiv = styled.div`
  color: white;
  text-align: center;
  margin-left: 0.25rem;
  font-weight: bolder;
`

const PlaceSearchDiv = styled.div`
  width: 100%;
  height: 3rem;
  border: none;
`

const DateDiv = styled.div`
  width: 9rem;
  color: #d5d1d1;
  font-size: 0.9rem;
`

const DayDetailDiv = styled.div<{isopen: boolean}>`
  width: ${(props) => props.isopen ? '24.75rem' : '0'};
  height: ${(props) => props.isopen ? '18rem' : '0'};
  margin-left: 7.875rem;
  background-color: aliceblue;
  overflow-y: scroll;
  transition: height 1s linear;
  display: flex;
  flex-direction: column;
  border: none;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const PlaceToggleList = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const PlaceToggleContainer = styled.div<{isopen: boolean}>`
  width: 24.75rem;
  height: ${(props) => props.isopen ? '15rem' : '0'};
  display: flex;
  flex-direction: column; 
`

const PlaceDetailDiv = styled.div<{isopen: boolean}>`
  width: ${(props) => props.isopen ? '24.75rem' : '0'};
  height: ${(props) => props.isopen ? '15rem' : '0'};
  transition: height 1s ease;
  display: flex;
  flex-direction: column;
  border: none;
`;

const DestinationNameDiv = styled.div`
  width: 8rem;
  height: 2rem;
  border: 1px brown solid;
  line-height: 2rem;
`

const PlaceNumberDiv = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
`

const PlaceAddressDiv = styled.div`
  width: 100%;
  height: 2rem;
`

const WishCntDiv = styled(PlaceAddressDiv)``

const TravelTimeDiv = styled(PlaceAddressDiv)``

const WishJoinDiv = styled(PlaceAddressDiv)``
 
const AccompanyPeopleSelect = styled.select`
  width: 5rem;
  height: 1.5rem;
  background-color: #ebebeb;
  border: none;
  border-radius: 0.125rem;
`

const PlaceAddDiv = styled(PlaceSearchDiv)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlaceAddButton = styled.button`
  width: 6rem;
  height: 3rem;
  background-color: #8CC4F8;
  color: white;
  border-radius: 0.875rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
const DeleteIconDiv = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15rem;
`

const PlaceToggleButton = styled.button`
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  background-color: transparent;
  margin-left: 13rem;
`

const EditIconDiv = styled(DeleteIconDiv)``;

