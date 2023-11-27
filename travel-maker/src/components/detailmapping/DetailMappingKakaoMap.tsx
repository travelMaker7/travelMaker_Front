import { MarkerData } from "@/utils/Types";
import React, { useEffect } from "react";
import styled from "styled-components";

declare const kakao: any;

interface Props {
  markers: MarkerData[];
}

export const DetailMappingKakaoMap: React.FC<Props> = ({ markers }) => {
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById("map");

      const map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      });

      const bounds = new kakao.maps.LatLngBounds();

      markers.forEach((marker) => {
        const position = new kakao.maps.LatLng(
          Number(marker.destinationX),
          Number(marker.destinationY)
        );

        const createMarker = new kakao.maps.Marker({
          position,
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

      if (!bounds.isEmpty()) {
        setTimeout(() => {
          map.setBounds(bounds);
          map.relayout();
        }, 300);
      }
    });
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
