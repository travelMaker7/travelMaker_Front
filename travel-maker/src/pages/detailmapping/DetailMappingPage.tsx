import { DetailMappingKakaoMap } from "@/components/detailmapping/DetailMappingKakaoMap";
import { DetailMappingInfo } from "@/components/detailmapping/DetailMappingInfo";
import styled from "styled-components";
// import { HeaderComponent } from "./HeaderComponent";
import { useState } from "react";
import { EnhancedMarkerData } from "@/utils/Types";
import Header from '../../components/search/Header'; // FilterSearch 컴포넌트 임포트

const DetailMappingPage: React.FC = () => {
  const [markers, setMarkers] = useState<EnhancedMarkerData[]>([]);
  const [activeTripPlanId, setActiveTripPlanId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<Schedule[]>([]);



  interface Schedule {
    scheduleId: number;
    nickname: string;
    scheduleDate: string; // 날짜 형식을 YYYY-MM-DD로 가정
    arriveTime: string; // 시간 형식을 HH:mm으로 가정
    leaveTime: string; // 시간 형식을 HH:mm으로 가정
  }
  
  interface SearchData {
    status: number;
    message: string;
    data: {
      address: string;
      destinationName: string;
      schedules: Schedule[]; // Schedule 인터페이스를 사용한 배열
    }
  }
  

   // Header 컴포넌트로부터 검색 결과를 받아오는 함수
   const handleSearchResults = (data: SearchData) => {
    setSearchResults(data.data.schedules);
  };


  return (
    <Container>
       <Header onSearch={handleSearchResults} /> 
      {/* <HeaderComponent /> */}
      <MainContainer>
        <MapContainer>
          <DetailMappingKakaoMap
            markers={markers}
            setActiveTripPlanId={setActiveTripPlanId}
          />
        </MapContainer>
        <SideContainer>
          <DetailMappingInfo
            setMarkers={setMarkers}
            activeTripPlanId={activeTripPlanId}
            setActiveTripPlanId={setActiveTripPlanId}
          />
        </SideContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  height: 100vh;
  padding: 40px;
  flex-direction: column;
  margin: 0 15vw;

`;

const MainContainer = styled.div`
  display: flex;
  margin: 10px 0;
  height: 100%;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  height: 85%;
  margin: 20px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  background: #d3d3d3;
`;

const SideContainer = styled.div`
  flex: 1;
  position: relative;
  height: 85%;
  margin: 20px;
  overflow-y: auto;
  border-radius: 20px;
  border: none;
  /* box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25); */
  /* background: #d3d3d3; */
`;

export default DetailMappingPage;
