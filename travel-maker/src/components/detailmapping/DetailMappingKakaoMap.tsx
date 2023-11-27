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

      console.log("markers: ", markers);
      console.log("bounds1: ", bounds);

      markers.forEach((marker) => {
        const position = new kakao.maps.LatLng(
          Number(marker.destinationX),
          Number(marker.destinationY)
        );

        console.log("position: ", position);

        bounds.extend(position);

        console.log("bounds2: ", bounds);

        const createMarker = new kakao.maps.Marker({
          position,
        });
        console.log("position: ", position);
        createMarker.setMap(map);

        console.log("createMarker: ", createMarker);
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
        }, 300); // Adjust delay as necessary
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
