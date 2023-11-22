import React, { useEffect } from "react";
import styled from "styled-components";
import { EnhancedMarkerData } from "@/utils/Types";

declare const kakao: any;

interface Props {
  markers: EnhancedMarkerData[];
  setActiveTripPlanId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DetailMappingKakaoMap: React.FC<Props> = ({
  markers,
  setActiveTripPlanId,
}) => {
  useEffect(() => {
    const container = document.getElementById("map");
    if (!container || markers.length === 0) return;

    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    });

    const bounds = new kakao.maps.LatLngBounds();

    markers.forEach((marker) => {
      const position = new kakao.maps.LatLng(
        Number(marker.destinationY),
        Number(marker.destinationX)
      );
      bounds.extend(position);

      const createMarker = new kakao.maps.Marker({
        position,
      });
      
      kakao.maps.event.addListener(createMarker, "click", () => {
        setActiveTripPlanId(marker.tripPlanId);
      });

      createMarker.setMap(map);
    });

    const polyline = new kakao.maps.Polyline({
      path: markers.map(
        (marker) =>
          new kakao.maps.LatLng(marker.destinationY, marker.destinationX)
      ),
      strokeWeight: 3,
      strokeColor: "#3b90ff",
      strokeOpacity: 0.6,
      strokeStyle: "solid",
    });
    polyline.setMap(map);

    map.setBounds(bounds);
  }, [markers]);

  return <KakaoMapContainer id="map"></KakaoMapContainer>;
};

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(122, 122, 130, 0.25);
  background: #d3d3d3;
`;
