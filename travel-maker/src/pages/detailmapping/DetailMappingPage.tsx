import { DetailMappingKakaoMap } from "@/components/detailmapping/DetailMappingKakaoMap";
import { DetailMappingInfo } from "@/components/detailmapping/DetailMappingInfo";
import styled from "styled-components";
import { HeaderComponent } from "./HeaderComponent";
import { useState } from "react";
import { EnhancedMarkerData } from "@/utils/Types";

const DetailMappingPage: React.FC = () => {
  const [markers, setMarkers] = useState<EnhancedMarkerData[]>([]);
  const [activeTripPlanId, setActiveTripPlanId] = useState<number | null>(null);

  return (
    <Container>
      <HeaderComponent />
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
