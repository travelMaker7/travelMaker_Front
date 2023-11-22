import React, { useEffect, useRef } from "react";

interface Marker {
  destinationY: string;
  destinationX: string;
}

interface KakaoStaticMapProps {
  markers: Marker[];
  width: string;
  height: string;
}

const KakaoStaticMap: React.FC<KakaoStaticMapProps> = ({
  markers,
  width,
  height,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && markers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          markers[0].destinationY,
          markers[0].destinationX
        ),
        level: 3, // Initial zoom level
      };

      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

      markers.forEach((marker) => {
        const markerPosition = new window.kakao.maps.LatLng(
          marker.destinationY,
          marker.destinationX
        );
        const newMarker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        newMarker.setMap(map);
        bounds.extend(markerPosition); // Extend the bounds to include this marker
      });

      if (markers.length > 1) {
        map.setBounds(bounds); // Adjust the map view to include all markers
      }
    }
  }, [markers]);

  return <div ref={mapContainer} style={{ width: width, height: height }} />;
};

export default KakaoStaticMap;
