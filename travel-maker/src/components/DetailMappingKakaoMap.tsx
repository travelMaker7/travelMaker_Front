import React, { useEffect } from "react";
import styled from "styled-components";

declare const kakao: any;

const KakaoMapContainer = styled.div`
  /* flex: 1; */
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  background: #d3d3d3;
`;

export const DetailMappingKakaoMap: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    if (!container) return;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return <KakaoMapContainer id="map"></KakaoMapContainer>;
};
