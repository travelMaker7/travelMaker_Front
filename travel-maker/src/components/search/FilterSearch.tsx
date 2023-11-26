import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
// API 기본 URL 설정
// const API_BASE_URL = 'http://121.178.106.179:8080';
// 헤더 컨테이너
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  position: relative; // For absolute positioning of child elements
  width: 50rem;
`;
// 검색창 컨테이너
const SearchBarContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${props => props.isExpanded ? '100%' : '100%'}; // 확장될 때와 아닐 때의 너비
  transition: width 0.3s ease;
  ${props => props.isExpanded && css`
    position: absolute;
    /* top: 60px; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
  `}
`;
type ExpandedSearchFieldsContainerProps = {
    isExpanded: boolean;
  };

// 확장된 검색 필드 컨테이너
const ExpandedSearchFieldsContainer = styled.div<ExpandedSearchFieldsContainerProps>`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${(props) =>
    props.isExpanded ? "#F0F0F0" : "#FFFFFF"}; // 확장 후 회색, 확장 전 흰색
  border-radius: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Field = styled.div<{ isActive?: boolean }>`
  flex-grow: 1;
  text-align: center;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? "#FFFFFF" : "transparent"}; // 활성화 시 흰색 배경
  border-radius: 32px;
  /* border: 1px solid ${(props) =>
    props.isActive ? "#FF385C" : "#DDDDDD"}; // 비활성화 상태일 때 회색 테두리
  color: ${(props) =>
    props.isActive
      ? "#333333"
      : "#BBBBBB"}; // 비활성화 상태일 때 회색 텍스트 */
  transition: all 0.3s ease;
  &:hover {
    background: ${props => props.isActive ? '#FFFFFF' : '#F6F6F6'}; // 비활성화 상태일 때에도 hover 효과
  }
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 106%;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  width: 50%;
`;
const ModalOption = styled.div`
  padding: 10px;
  &:hover {
    background-color: #F7F7F7;
  }
`;
const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #6fadff;
  color: white;
  border: none;
  border-radius: 32px;
  cursor: pointer;
`;
interface DateModalProps {
    show: boolean;
  }
const DateModal = styled.div<DateModalProps>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 106%;
  left: 21%;
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  padding: 20px;
  width: 50%; // DateModal의 너비 조정
`;
const DatePickerInput = styled.input`
  width: 98%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px;
`;
interface GuestModalProps {
    show: boolean;
  }
  const GuestModal = styled.div<GuestModalProps>`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 106%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  width: 50%;
  padding: 20px;
`;
const GuestInput = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
`;
const DateFieldContainer = styled.div`
  width: 80%; // 너비를 80%로 조정
  margin: 0 auto; // 가운데 정렬
`;
const FilterSearch: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("지역"); // 초기값 '지역'으로 설정
  const [selectedGender, setSelectedGender] = useState("성별");
  const [selectedAge, setSelectedAge] = useState("나이");
  // const [selectedDate, setSelectedDate] = useState('날짜');
  const [minGuests, setMinGuests] = useState<number | null>(null);
  const [maxGuests, setMaxGuests] = useState<number | null>(null);
  const [selectedGuests, setSelectedGuests] = useState("인원");
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetStartDate, setTargetStartDate] = useState('');
  const [targetFinishDate, setTargetFinishDate] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [minEndDate, setMinEndDate] = useState('');
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setActiveField(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (minGuests !== null && maxGuests !== null) {
      setSelectedGuests(`${minGuests}~${maxGuests}명`);
    } else {
      setSelectedGuests("인원");
    }
  }, [minGuests, maxGuests]);

  // 최소 인원 입력 변경 처리
  const handleMinGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : null;
    if (newValue === null || newValue >= 0) {
      setMinGuests(newValue);
      if (maxGuests !== null && newValue !== null && newValue > maxGuests) {
        // 최대 인원보다 더 큰 최소 인원이 입력된 경우
        // 최대 인원을 비웁니다.
        setMaxGuests(null);
      }
    }
  };

  // 최대 인원 입력 변경 처리
  const handleMaxGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : null;
    if (newValue === null || (minGuests === null || newValue >= minGuests)) {
      setMaxGuests(newValue);
    }
  };

  const handleSearch = async () => {
    const searchData = {
      targetStartDate: formatDate(targetStartDate),
      targetFinishDate: formatDate(targetFinishDate),
      ageRange: selectedAge,
      gender: selectedGender === "남자" ? "male" : "female",
      minPerson: minGuests ?? undefined,
      maxPerson: maxGuests ?? undefined,
      region: selectedRegion,
    };
    try {
      const response = await axios.get("https://sosak.store/api/v1/trip/search/?page=1&size=10&destinationX =&destinationY=", {
        params: searchData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("HTTP 상태 코드:", response.status);
      console.log(response.data);
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };
 
useEffect(() => {
  setMinEndDate(targetStartDate); 
  if (targetFinishDate && targetFinishDate < targetStartDate) {
    setTargetFinishDate(''); 
  }
}, [targetStartDate, targetFinishDate]);


  const formatDate = (date: string | undefined): string | undefined => {
  if (!date) return undefined;
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  return (
    <HeaderContainer ref={containerRef}>
      <SearchBarContainer isExpanded={isExpanded}>
        <ExpandedSearchFieldsContainer
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(true)}
        >
          {!isExpanded ? (
            // Initial search fields here
            <>
              <Field>어디든지</Field>
              <Field>언제든지</Field>
              <Field>누구와?</Field>
              {/* <SearchButton onClick={() => setIsExpanded(false)}>검색</SearchButton> */}
              <SearchButton onClick={handleSearch}>검색</SearchButton>
            </>
          ) : (
            // Expanded search fields here
            <>
              <Field
                isActive={activeField === "location"}
                onClick={() => setActiveField("location")}
              >
                {selectedRegion}
              </Field>
              <Field
                isActive={activeField === "gender"}
                onClick={() => setActiveField("gender")}
              >
                {selectedGender}
              </Field>
              <Field
                isActive={activeField === "age"}
                onClick={() => setActiveField("age")}
              >
                {selectedAge}
              </Field>
              <Field
                isActive={activeField === "dates"}
                onClick={() => setActiveField("dates")}
              >
                {targetStartDate && targetFinishDate
                  ? `${targetStartDate} - ${targetFinishDate}`
                  : "날짜 선택"}
              </Field>
              <Field
                isActive={activeField === "guests"}
                onClick={() => setActiveField("guests")}
              >
                {selectedGuests}
              </Field>
              {/* <SearchButton onClick={() => setIsExpanded(false)}>검색</SearchButton> */}
              <SearchButton onClick={handleSearch}>검색</SearchButton>
            </>
          )}
        </ExpandedSearchFieldsContainer>
        {activeField === "location" && (
          <Modal>
            {[
              "서울",
              "경기도",
              "경상도",
              "강원도",
              "충청도",
              "전라도",
              "제주도",
              "인천",
            ].map((region) => (
              <ModalOption
                key={region}
                onClick={() => {
                  setSelectedRegion(region); // 지역 선택 시 상태 업데이트
                  setActiveField(null);
                }}
              >
                {region}
              </ModalOption>
            ))}
          </Modal>
        )}
        {activeField === 'gender' && (
            <Modal>
              {['남자', '여자'].map((gender) => (
                <ModalOption key={gender} onClick={() => {
                  setSelectedGender(gender);
                  setActiveField(null)}}>
                  {gender}
                </ModalOption>
              ))}
            </Modal>
          )}
          {activeField === 'age' && (
            <Modal>
              {['10대', '20대', '30대', '40대', '50대'].map((ageRange) => (
                <ModalOption key={ageRange} onClick={() => {
                  setSelectedAge(ageRange);
                  setActiveField(null)}}>
                  {ageRange}
                </ModalOption>
              ))}
            </Modal>
          )}
        {activeField === 'dates' && (
          <DateModal show={activeField === 'dates'}>
              <DateFieldContainer>
                <Label htmlFor="startDate">시작 날짜</Label>
                <DatePickerInput type="date" id="startDate" value={targetStartDate} onChange={(e) => setTargetStartDate(e.target.value)} />
              </DateFieldContainer>
              <DateFieldContainer>
                <Label htmlFor="finishDate">종료 날짜</Label>
                <DatePickerInput type="date" id="finishDate"  min={minEndDate} value={targetFinishDate} onChange={(e) => setTargetFinishDate(e.target.value)} />
              </DateFieldContainer>
          </DateModal>
        )}
        {activeField === 'guests' && (
          <GuestModal show={activeField === 'guests'}>
            <div>
              <Label htmlFor="minGuests">최소 인원</Label>
              <GuestInput type="number" id="minGuests" value={minGuests ?? ''} onChange={handleMinGuestsChange} />
            </div>
            <div>
              <Label htmlFor="maxGuests">최대 인원</Label>
              <GuestInput type="number" id="maxGuests" value={maxGuests ?? ''}  onChange={handleMaxGuestsChange} />
            </div>
          </GuestModal>
        )}
      </SearchBarContainer>
    </HeaderContainer>
  );
};

export default FilterSearch;
