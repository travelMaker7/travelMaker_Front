import  { useState } from 'react';
// import { HeaderComponent } from '../detailmapping/HeaderComponent';
import styled from 'styled-components';
import LocalMap from '../../components/localcategorymapping/LocalMap';
import InfoIcon from '@mui/icons-material/Info';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Header from '../../components/search/Header'; // FilterSearch 컴포넌트 임포트

const RES = {
	"status": 201,
  "message": "여행지 리스트 가져오기 성공",
  "data":{
			"address" : "서울 종로구 사직로 161", // 일단 추가해놓았음
			"destinationName" : "경복궁",	// 이걸로 찾는게 좋지 않나? 유저가 보기엔 주소보다 지역명이 났잖아? 
			"schedules" : [
        { 
          "scheduleId": 3,  
          "nickname" : "suminLee",
          "scheduleDate" : "2023-10-20",
          "arriveTime" : "11:00",
          "leaveTime" : "12:00"
        },
        { 
          "scheduleId": 4,  
          "nickname" : "ktsomu",
          "scheduleDate" : "2023-10-21",
          "arriveTime" : "15:00",
          "leaveTime" : "18:00"
        },
        { 
        "scheduleId": 5,  
        "nickname" : "kaka",
        "scheduleDate" : "2023-10-24",
        "arriveTime" : "16:00",
        "leaveTime" : "18:00"
        },
        { 
        "scheduleId": 6,  
        "nickname" : "ktsom123",
        "scheduleDate" : "2023-10-25",
        "arriveTime" : "15:00",
        "leaveTime" : "18:00"
        },
        { 
          "scheduleId": 7,  
          "nickname" : "ktsom12345",
          "scheduleDate" : "2023-10-26",
          "arriveTime" : "15:00",
          "leaveTime" : "18:00"
        },
        { 
          "scheduleId": 8,  
          "nickname" : "ktsom1236",
          "scheduleDate" : "2023-10-28",
          "arriveTime" : "15:00",
          "leaveTime" : "18:00"
        },
			],
		}
}

const LocalCategoryMappingPage = () => {
  
  // const {data: {address}} = RES;
  // const {data: {destinationName}} = RES;
  const {data: {schedules}} = RES
  const pages = Math.ceil(schedules.length / 4);
  const [searchResults, setSearchResults] = useState<Schedule[]>([]);


  interface Schedule {
    scheduleId: number;
    nickname: string;
    scheduleDate: string;
    arriveTime: string;
    leaveTime: string;
  }
  
  interface SearchData {
    schedules: Schedule[];
  }
  
  const handleSearchResults = (data: SearchData) => {
    setSearchResults(data.schedules);
    console.log(searchResults);
  };
  
  return (
    
    <>
      <Header onSearch={handleSearchResults} />
      {/* <HeaderComponent/> */}
      <MainContainer>
        <MapContainer>
          <LocalMap/>
        </MapContainer>
        <ListContainer
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          loop={true}
        >
          {[...Array(pages)].map((_, pageIndex) => (
              <SwiperSlide key={pageIndex}>
                {schedules.slice(pageIndex * 4, (pageIndex + 1) * 4).map(
                  ({ nickname, scheduleDate, arriveTime, leaveTime }, index) => (
                    <DetailListDiv key={index}>
                      <ListThemeDiv>
                        <NicknameDiv>{nickname} 님의 일정</NicknameDiv>
                        <ScheduleDateDiv>{scheduleDate}</ScheduleDateDiv>
                      </ListThemeDiv>
                      <TravelTimeDiv>여행 시간 : {arriveTime} ~ {leaveTime}</TravelTimeDiv>
                      <DetailViewBtn>
                        <DetailIconDiv>
                          <InfoIcon/>
                        </DetailIconDiv>
                        <DetailDescriptrionDiv>상세보기</DetailDescriptrionDiv>
                      </DetailViewBtn>
                    </DetailListDiv>
                  )
                )}
              </SwiperSlide>
            ))}
        </ListContainer>
      </MainContainer>
    </>
  );
};

export default LocalCategoryMappingPage;

const MainContainer = styled.div`
  width: 100%;
  height: 53.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  /* height:80% */
`

const MapContainer = styled.div`
  width: 59.375rem;
  height: 45rem;
  border: 1px #e9e9e9 solid;
`

const ListContainer = styled(Swiper)`
  width: 100%;
  height: 45rem;
  display: flex;
  flex-direction: column;
  border: 1px #e9e9e9 solid;
  align-items: center;
  padding: 0 3rem;
`

const DetailListDiv = styled.div`
  width: 100%;
  height: 8.75rem;
  border: 1px #ebebeb solid;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  justify-content: space-around;
  background-color: #f9fcfe;
`

const DetailViewBtn = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  background-color: #FFECF3;
  border: none;
  color: #ffc3d9;
  border-radius: 1.25rem;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.0625rem 0.0625rem 0 #ffc3d9;
  cursor: pointer;
`

const DetailIconDiv = styled.div`
  width: 1.5625rem;
  height: 1.5625rem;
  margin-right: 0.5rem;
`

const DetailDescriptrionDiv = styled.div`
  height: 1.25rem;
  line-height: 1.25rem;
`
const ListThemeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-weight: bolder;
  align-items: center;
`

const TravelTimeDiv = styled.div`
  width: 100%;
  font-weight: bolder;
  color: #35c982;
`

const NicknameDiv = styled.div`
  font-weight: bolder;
`

const ScheduleDateDiv = styled.div`
  color: #35c982;
  background-color: #f0f0e6;
  width: 6.25rem;
  border-radius: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.7rem;
`


