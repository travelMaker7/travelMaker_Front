import { DetailMappingKakaoMap } from "@/components/detailmapping/DetailMappingKakaoMap";
import { DetailMappingInfo } from "@/components/detailmapping/DetailMappingInfo";
import styled from "styled-components";
// import { HeaderComponent } from "./HeaderComponent";
import { useState } from "react";
import { MarkerData } from "@/utils/Types";

const DetailMappingPage: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [activeScheduledDate, setActiveScheduledDate] = useState<string | null>(
    null
  );
  return (
    <>
      <HeaderComponent />
      <Container>
        <MainContainer>
          <MapContainer>
            <DetailMappingKakaoMap markers={markers} />
          </MapContainer>
          <SideContainer>
            <DetailMappingInfo
              setMarkers={setMarkers}
              activeScheduledDate={activeScheduledDate}
              setActiveScheduledDate={setActiveScheduledDate}
            />
          </SideContainer>
        </MainContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  height: 100vh;
  padding: 40px;
  flex-direction: column;
  margin: 0 20vw;
`;

const MainContainer = styled.div`
  display: flex;
  margin: 10px 0;
  height: 80%;

  @media (max-width: 1024px) {
    flex-direction: column; // 화면이 1024px보다 작아지면 세로 방향으로 배열
  }
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

  @media (max-width: 1024px) {
    height: 50%; // 세로 레이아웃에서 지도의 높이
  }
`;

const SideContainer = styled.div`
  flex: 1;
  position: relative;
  height: 85%;
  margin: 20px;
  padding-bottom: 10px;
  overflow-y: auto;
  border-radius: 20px;
  border: none;
  /* box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25); */
  /* background: #d3d3d3; */

  @media (max-width: 1024px) {
    height: 50%; // 세로 레이아웃에서 사이드 컨테이너의 높이
  }
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for Webkit browsers
  }
  -ms-overflow-style: none; // Hide scrollbar for IE and Edge
  scrollbar-width: none;
`;

export default DetailMappingPage;
