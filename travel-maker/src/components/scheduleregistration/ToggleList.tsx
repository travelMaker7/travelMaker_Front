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
import { SchedulesProps, PlacesProps, DataControlProps } from '@/pages/scheduleregistration/ScheduleRegistrationPage';

interface DatesProps {
  selectedRange: [Dayjs | null, Dayjs | null] | null;
  dayCnt: number | null;
}

const ToggleList: React.FC<DatesProps & DataControlProps> = ({ 
  selectedRange, 
  dayCnt, 
  accompanyCnt, 
  setAccompanyCnt, 
  accompanyOption, 
  setAccompanyOption, 
  autoSchedules, 
  setAutoSchedules,
  arriveTimeValue,
  setArriveTimeValue,
  leaveTimeValue,
  setLeaveTimeValue, 
}) => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  

  useEffect(() => {
    if (dayCnt !== null && dayCnt > 0) {
      const newAutoSchedules: SchedulesProps[] = []; 
      for (let i = 0; i < dayCnt; i++) {
        if (selectedRange !== null && selectedRange[0] !== null && selectedRange[1] !== null) {
          const currentDate = selectedRange[0].add(i, 'day');
          const schedule = {
            day: i + 1,
            scheduleDate: currentDate.format('YYYY-MM-DD'),
            places: [],
            dayStates: false,
          };
          console.log('schedule: ', schedule);
          newAutoSchedules.push(schedule);
        }
      }
      console.log('newAutoSchedules: ', newAutoSchedules);
      setAutoSchedules(newAutoSchedules);
    }
  }, [dayCnt, selectedRange]);

  const dayToggleHandler = (index: number) => {
    console.log('index: ', index);
    setAutoSchedules((prev) => {
      const newAutoSchedules = [...prev];
      newAutoSchedules[index] = {
        ...newAutoSchedules[index],
        dayStates: !newAutoSchedules[index].dayStates
      };
      return newAutoSchedules;
    })
    console.log('autoSchedules: ',autoSchedules);
  };

  const placeToggleHandler = (index: number, placeIndex: number) => {
    console.log('index: ', index);
    console.log('placeIndex', placeIndex)
    setAutoSchedules((prev) => {
      const newAutoSchedules = [...prev];
      const newPlaces = [...newAutoSchedules[index].places];  // 배열 복사
      newPlaces[placeIndex] = {
        ...newPlaces[placeIndex],
        placeStates: !newPlaces[placeIndex].placeStates
      };
      newAutoSchedules[index] = { ...newAutoSchedules[index], places: newPlaces };
  
      return newAutoSchedules;
    });
  };

  const openSearchModal = (dayIndex: number | null) => {
    setIsModalOpen(true); // 모달을 열기
    setSelectedDayIndex(dayIndex);
  }

  const closeSearchModal = () => {
    setIsModalOpen(false);
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccompanyOption(e.target.value);
  };

  const handleArriveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentArriveTime = e.target.value;
    setArriveTimeValue(currentArriveTime);
  };

  const handleLeaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveTimeValue(e.target.value.toString());
  };

  const handleAccompanyCnt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target.value;
    setAccompanyCnt(parseInt(inputValue, 10));
  };

  const addPlaceToSchedule = (selectedPlace: PlacesProps, scheduleKey: number | null) => {
    setAutoSchedules((prev) => {
      const updatedAutoSchedules = prev.map((schedule) => {
        if (schedule.day === scheduleKey) {
          const isDuplicate = schedule.places.some(
            (place) => place.destinationX === selectedPlace.destinationX && place.destinationY === selectedPlace.destinationY
          );

          if (!isDuplicate) {
            return {
              ...schedule,
              places: [...schedule.places, selectedPlace],
            };
          }
        }
        return schedule;
      });

      return updatedAutoSchedules;
    });
    closeSearchModal();
  };

  return (
    <>
      {autoSchedules.map((schedule, index) => (
        <DayToggleContainer isopen={schedule.dayStates} key={schedule.day}>
          <DayToggleList>
            <DayThemeDiv>
              <WbSunnyIcon style={{ color: 'white', width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
              <DayDiv>Day</DayDiv>
              <CountDayDiv>{schedule.day}</CountDayDiv>
            </DayThemeDiv>
            <DateDiv>
              {dayjs(schedule.scheduleDate).format("YYYY년 MM월 DD일")}
            </DateDiv>
            <AddLocationButton onClick={() => openSearchModal(schedule.day)}>
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
                style={{ color: '#8cc3f8', marginBottom: '0.125rem', transform: schedule.dayStates ? 'rotate(90deg)' : 'rotate(0)', cursor: 'pointer' }}
              />
            </DayTogglebutton>
          </DayToggleList>
          <DayDetailDiv isopen={schedule.dayStates} key={schedule.day}>
            {autoSchedules[index].places.map((place, placeIndex) => (
              <PlaceToggleContainer isopen={place.placeStates} key={`${place.destinationX}-${place.destinationY}`}>
                <PlaceToggleList>
                  <DestinationNameDiv>{place.destinationName}</DestinationNameDiv>
                  <PlaceToggleButton onClick={() => placeToggleHandler(index, placeIndex)}>
                    <ArrowForwardIosIcon
                      style={{ color: '#8cc3f8', marginBottom: '0.125rem', transform: place.placeStates ? 'rotate(90deg)' : 'rotate(0)', cursor: 'pointer' }}
                    />
                  </PlaceToggleButton>
                </PlaceToggleList>
                <PlaceDetailDiv isopen={place.placeStates}>
                  <PlaceAddressDiv>상세 주소 : {autoSchedules[index].places[placeIndex].address}</PlaceAddressDiv>
                  <WishJoinDiv>
                    <AccompanyChoiceDiv>동행 여부</AccompanyChoiceDiv>
                    <RadioDiv>
                      <RadioField>
                        <ChoiceLabel>
                          <AddressInput 
                            type='radio' 
                            name='accompany' 
                            value='true' 
                            checked={accompanyOption === 'true'}
                            onChange={handleRadioChange}
                          />
                          <TrueSpan>동행 가능</TrueSpan>
                        </ChoiceLabel>
                        <ChoiceLabel>
                          <KeywordInput 
                            type='radio' 
                            name='accompany' 
                            value='false'
                            checked={accompanyOption === 'false'}
                            onChange={handleRadioChange}
                          />
                          <FalseSpan>동행 불가</FalseSpan>
                        </ChoiceLabel>
                      </RadioField>
                    </RadioDiv>
                  </WishJoinDiv>
                  <WishCntDiv>
                    <AccompanyPeopleCntDiv>
                      동행인원
                    </AccompanyPeopleCntDiv>
                    <AccompanyPeopleSelect value={accompanyCnt} onChange={handleAccompanyCnt}>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </AccompanyPeopleSelect>
                  </WishCntDiv>
                  <TravelTimeDiv>
                    <TravelTimeThemeDiv>여행 시간</TravelTimeThemeDiv>
                      <ArriveInput type='time' value={arriveTimeValue || ''} onChange={handleArriveChange}/>~<LeaveInput type='time' value={leaveTimeValue || ''} onChange={handleLeaveChange}/>
                  </TravelTimeDiv>
                </PlaceDetailDiv>
              </PlaceToggleContainer>
            ))}
          </DayDetailDiv> 
      </DayToggleContainer>
    ))}
    {isModalOpen && 
      <PlaceSearchModal 
        closeSearchModal={closeSearchModal}  
        autoSchedules={autoSchedules}
        setAutoSchedules={setAutoSchedules}
        selectedDayIndex={selectedDayIndex} 
      />}
    </>
  );
};

export default ToggleList;

const DayToggleContainer = styled.div<{isopen: boolean}>`
  width: 31.25rem;
  height: ${(props) => props.isopen ? '22.75rem' : '4.75rem'};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const DayToggleList = styled.div`
  width: 31.25rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
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
  width: ${(props) => props.isopen ? '25.75rem' : '0'};
  height: ${(props) => props.isopen ? '18rem' : '0'};
  margin-left: 7.875rem;
  background-color: aliceblue;
  overflow-y: scroll;
  transition: height 1s linear;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const PlaceToggleList = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
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
  width: 15rem;
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
  line-height: 2rem;
  display: flex;
  justify-content: baseline;
  margin-left: 1rem;
  align-items: center;
`

const WishCntDiv = styled(PlaceAddressDiv)``

const TravelTimeDiv = styled(PlaceAddressDiv)``

const WishJoinDiv = styled(PlaceAddressDiv)``
 
const AccompanyPeopleSelect = styled.select`
  width: 5rem;
  height: 1.25rem;
  background-color: #ebebeb;
  border: none;
  border-radius: 0.125rem;
  margin-left: 1rem;
`

const AccompanyPeopleCntDiv = styled.div`
  width: 5rem;
  height: 1.25rem;
`

const AccompanyChoiceDiv = styled(AccompanyPeopleCntDiv)``

const TravelTimeThemeDiv = styled(AccompanyPeopleCntDiv)``

const ArriveInput = styled.input`
  width: 6rem;
  height: 1.25rem;
  background-color: #ebebeb;
  border: none;
  border-radius: 0.125rem;
  margin-left: 1rem;
`

const LeaveInput = styled(ArriveInput)``



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
  background-color: transparent;
  margin-left: 6rem;
`

const EditIconDiv = styled(DeleteIconDiv)``;

const RadioDiv = styled.div`
  width: 12rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
`

const RadioField = styled.fieldset`
  padding: 0;
  border: none;
`

const TrueSpan = styled.span``

const FalseSpan = styled(TrueSpan)``

const AddressInput = styled.input`
`

const KeywordInput = styled(AddressInput)`
  margin-left: 1rem;
`

const ChoiceLabel = styled.label``

