import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import {PlacesProps, SchedulesProps} from '../../pages/scheduleregistration/ScheduleRegistrationPage';

interface ModalControlProps {
  closeSearchModal: () => void;
  autoSchedules: SchedulesProps[];
  setAutoSchedules: React.Dispatch<React.SetStateAction<SchedulesProps[]>>;
  selectedDayIndex: number | null;
}

interface KeywordAddressInfo {
  address_name: string,
  place_name: string | null,
  place_url: string | null,
  road_address_name: string | null,
  x: string;
  y: string;
  id: string;
  region_1depth_name: string;
}

interface AddressInfo {
  address_name: string,
  x: string;
  y: string;
  building_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

const PlaceSearchModal: React.FC<ModalControlProps> = ({closeSearchModal, autoSchedules, setAutoSchedules, selectedDayIndex}) => {

  const [keywordAddressInfos, setKeywordAddressInfos] = useState<KeywordAddressInfo[]>([]);
  const [addressInfos, setAddressInfos] = useState<AddressInfo[]>([]); 
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>('address');

  const { VITE_REST_API_KEY } = import.meta.env;

  const submitSearch = () => {
    if(searchOption === 'keyword') {
      axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=${searchValue}`, {
      headers: {
        'Authorization': `KakaoAK ${VITE_REST_API_KEY}`
      }
      })
      .then((res) => {
        console.log(res);
        console.log("검색 성공")
        if(res.data.documents && Array.isArray(res.data.documents)) {
          const newKeywordAddressInfos: KeywordAddressInfo[] = res.data.documents.map((doc: any) => ({
            address_name: doc.address_name,
            place_name: doc.place_name,
            place_url: doc.place_url,
            road_address_name: doc.road_address_name,
            x: doc.x,
            y: doc.y,
            id: doc.id,
            region_1depth_name: doc.address_name.split(" ")[0]
          }));
          setKeywordAddressInfos(newKeywordAddressInfos);
        }
      })
      .catch((error) => {
        console.error('오류 발생: ', error);
      })  
    } else {
      axios.get(`https://dapi.kakao.com/v2/local/search/address.json?page=1&size=15&sort=accuracy&query=${searchValue}`, {
      headers: {
        'Authorization': `KakaoAK ${VITE_REST_API_KEY}`
      }
      })
      .then((res) => {
        console.log(res);
        console.log("검색 성공")
        if(res.data.documents && Array.isArray(res.data.documents)) {
          const newAddressInfos: AddressInfo[] = res.data.documents.map((doc: any) => ({
            place_name: doc.road_address.building_name,
            address_name: doc.address_name,
            x: doc.x,
            y: doc.y,
            region_1depth_name: doc.road_address.region_1depth_name,
            region_2depth_name: doc.road_address.region_2depth_name,
            region_3depth_name: doc.road_address.region_3depth_name,
          }));
          setAddressInfos(newAddressInfos);
        }
      })
      .catch((error) => {
        console.error('오류 발생: ', error);
      })  
    }
    
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  const handleRegionSector = (place: PlacesProps) => {
    switch (place.region) {
      case "광주":
        place.region = "전라";
        break;
      case "제주특별자치도":
        place.region = "제주";
        break;
      case "부산":
        place.region = "경상";
        break;
      case "울산":
        place.region = "경상";
        break;
      case "대구":
        place.region = "경상";
        break;
      case "세종특별자치시":
        place.region = "충청";
        break;
      case "대전":
        place.region = "충청";
        break;
      case "전남":
        place.region = "전라";
        break;
      case "전북":
        place.region = "전라";
        break;
      case "경북":
        place.region = "경상";
        break;
      case "경남":
        place.region = "경상";
        break;
      case "충남":
        place.region = "충청";
        break;  
      case "충북":
        place.region = "충청";
        break;
      case "강원특별자치도":
        place.region = "강원";
        break;      
      default:
        console.log("예외 케이스 발생 확인 바람");      
    }
  };

  const chooseKeywordAddress = (selectedKeywordAddress: KeywordAddressInfo, scheduleKey: number | null) => {
    const newPlace: PlacesProps = {
      destinationName: selectedKeywordAddress.place_name || "",
      address: selectedKeywordAddress.address_name || "",
      destinationX: selectedKeywordAddress.x,
      destinationY: selectedKeywordAddress.y,
      region: selectedKeywordAddress.region_1depth_name,
      placeStates: false,
      wishCnt: null,
      wishJoin: false,
      arriveTime: null,
      leaveTime: null,
    };

    handleRegionSector(newPlace);
    console.log('newPlace: ', newPlace);
    setAutoSchedules((prev) => {
      const updatedAutoSchedules = prev.map((schedule) => {
        if (schedule.day === scheduleKey) {
          const isDuplicate = schedule.places.some(
            (place) => place.destinationX === newPlace.destinationX && place.destinationY === newPlace.destinationY
          );
  
          if (!isDuplicate) {
            return {
              ...schedule,
              places: [...schedule.places, newPlace],
            };
          }
        }
        console.log('schedule: ', schedule);
        return schedule;
      });
      console.log('updatedAutoSchedules: ', updatedAutoSchedules);
      return updatedAutoSchedules;
    });
    console.log('autoSchedules :', autoSchedules);
    closeSearchModal();
  };

  const chooseAddress = (selectedAddress: AddressInfo, scheduleKey: number | null) => {
    const newPlace: PlacesProps = {
      destinationName: selectedAddress.building_name || "",
      address: selectedAddress.address_name || "",
      destinationX: selectedAddress.x,
      destinationY: selectedAddress.y,
      region: selectedAddress.region_1depth_name,
      placeStates: false,
      wishCnt: null,
      wishJoin: false,
      arriveTime: null,
      leaveTime: null,
    };

    handleRegionSector(newPlace);
    console.log('newPlace: ', newPlace);
    
    setAutoSchedules((prev) => {
      const updatedAutoSchedules = prev.map((schedule) => {
        if (schedule.day === scheduleKey) {
          const isDuplicate = schedule.places.some(
            (place) => place.destinationX === newPlace.destinationX && place.destinationY === newPlace.destinationY
          );
  
          if (!isDuplicate) {
            return {
              ...schedule,
              places: [...schedule.places, newPlace],
            };
          }
        }
        console.log('schedule: ', schedule);
        return schedule;
      });
      console.log('updatedAutoSchedules: ', updatedAutoSchedules);
      return updatedAutoSchedules;
    });
    console.log('autoSchedules :', autoSchedules);
    closeSearchModal();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={closeSearchModal}>&times;</CloseButton>
          <LogoDiv>
            <img src='/travelmakerxkakao.svg' alt='travelMakerLogo' width={160} height={100}/>
            <ClearIcon style={{width: '2.5rem', height: '2.5rem'}}/>
            <img src='/kakaologo.svg' alt='kakaoLogo' width={140} height={80} style={{marginLeft: '1rem'}}/> 
          </LogoDiv>
          <RadioDiv>
            <RadioField>
              <ChoiceLabel>
                <AddressInput 
                  type='radio' 
                  name='search' 
                  value='address' 
                  checked={searchOption === 'address'}
                  onChange={handleRadioChange}
                />
                <AddressSpan>주소로 검색</AddressSpan>
              </ChoiceLabel>
              <ChoiceLabel>
                <KeywordInput 
                  type='radio' 
                  name='search' 
                  value='keyword'
                  checked={searchOption === 'keyword'}
                  onChange={handleRadioChange}
                />
                <KeywordSpan>키워드로 검색</KeywordSpan>
              </ChoiceLabel>
            </RadioField>
          </RadioDiv>
          <SearchInputDiv>
            <SearchInput onChange={handleSearchChange}/>
            <SearchButton onClick={submitSearch}>검색</SearchButton>
          </SearchInputDiv>
          <AddressListContainer>
            {
              searchOption === 'keyword' ? (
                keywordAddressInfos && keywordAddressInfos.map((address) => (
                  <AddressListDiv key={address.id} onClick={() => chooseKeywordAddress(address, selectedDayIndex)}>
                    <DestinationDiv>
                      장소명 : {address.place_name ? address.place_name : <DestinationInput/>}
                    </DestinationDiv>
                    <AddressDiv>행정동 주소 : {address.address_name}</AddressDiv>
                    <RoadAddressDiv>도로명 주소 : {address.road_address_name}</RoadAddressDiv>
                  </AddressListDiv>
                ))
              ) : (
                addressInfos && addressInfos.map((address) => (
                  <AddressListDiv key={address.address_name} onClick={() => chooseAddress(address, selectedDayIndex)}>
                    <DestinationDiv>
                      장소명 : {address.building_name !== "" ? address.building_name : "없음"}
                    </DestinationDiv>
                    <AddressDiv>행정동 주소 : {address.address_name}</AddressDiv>
                    <RoadAddressDiv>도로명 주소 : {address.address_name}</RoadAddressDiv>
                  </AddressListDiv>
                ))
              )
            }
          </AddressListContainer>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PlaceSearchModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 희미한 검은색 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: #FAE202;
  padding: 20px;
  border-radius: 5px;
  width: 31.25rem; /* 모달의 가로 크기 */
  height: 43.75rem; /* 모달의 세로 크기 */
  position: fixed; /* fixed로 변경 */
  top: 50%; /* 화면 상단에서 50% 위치 */
  left: 50%; /* 화면 왼쪽에서 50% 위치 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 transform */
  z-index: 101;
`;

const ModalContent = styled.div`
  padding: 4rem;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
`;

const SearchInputDiv = styled.div`
  width: 28.75rem;
  height: 3.5rem;
  position: absolute;
  top: 13rem;
  left: 2.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: calc(100% - 4.5rem);
  height: 3rem;
  border: none;
  box-sizing: border-box;
  font-size: 1.25rem;
  text-indent: 0.75rem;
  color: #381D1D;
  border-radius: 0.625rem 0 0 0.625rem;
  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  width: 4.5rem;
  height: 3rem;
  border: none;
  box-sizing: border-box;
  background-color: #381D1D;
  border-radius: 0 0.625rem 0.625rem 0;
  color: #FAE202;
  font-size: 1.25rem;
  cursor: pointer;
`

const LogoDiv = styled.div`
  width: 24rem;
  height: 6rem;
  position: absolute;
  top: 2rem;
  left: 4.5rem;;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const RadioDiv = styled.div`
  width: 15rem;
  height: 3rem;
  position: absolute;
  top: 10rem;
  left: 2.5rem;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
`

const RadioField = styled.fieldset`
  padding: 0;
  border: none;
`

const AddressSpan = styled.span``

const KeywordSpan = styled(AddressSpan)``

const AddressInput = styled.input`
`

const KeywordInput = styled(AddressInput)`
  margin-left: 1rem;
`

const ChoiceLabel = styled.label``

const AddressListContainer = styled.div`
  width: 28.75rem;
  height: 24rem;
  border: 2px #381D1D solid;
  position: absolute;
  top: 19rem;
  left: 2.5rem;
  box-sizing: border-box;
  background-color: white;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }  
`

const AddressListDiv = styled.div`
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  border-bottom: 1px #381D1D solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AddressDiv = styled.div`
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`

const DestinationDiv = styled(AddressDiv)`
  font-weight: bolder;
`

const RoadAddressDiv = styled(AddressDiv)``

const DestinationInput = styled.input`
  width: 5rem;
  height: 1.5rem;
  border: none;
`

const ErrorDiv = styled.div`
  width: 28.75rem;
  height: 24rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ErrorMessageDiv = styled.div`
  width: 20rem;
  height: 4rem;
  font-size: 2rem;
  font-weight: bolder;
`

const ErrorMessage2Div = styled.div`
  width: 20rem;
  height: 4rem;
  font-weight: bolder;
`





