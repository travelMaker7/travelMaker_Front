import React, { useEffect } from 'react';
import { XYDataProps } from '@/pages/scheduleregistration/ScheduleRegistrationPage';
import { useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer: React.FC<XYDataProps> = ({ xData, yData }) => {
  const [map, setMap] = useState<any>(null); // 맵 인스턴스 상태
  const [markers, setMarkers] = useState<any[]>([]); // 마커 목록 상태
  const [polyline, setPolyline] = useState<any>(null); // 폴리라인 상태

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 7,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap); // 맵 인스턴스 저장

  }, []);

  useEffect(() => {
    // xData와 yData가 유효한 값인지 확인
    if (map && xData && yData) {
      // 새로운 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(yData, xData);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커 지도에 표시
      marker.setMap(map);

      // 기존 마커 목록에 추가
      setMarkers((prevMarkers) => [...prevMarkers, marker]);

      // 폴리라인 업데이트
      updatePolyline();
    }
  }, [map, xData, yData]);

  useEffect(() => {
    // 마커 목록이 업데이트되면 지도의 범위 재설정
    if (map && markers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });

      // 마커가 모두 표시되는 영역에 맞게 지도의 중심과 레벨을 설정
      map.setBounds(bounds);
    }
  }, [map, markers]);

  const updatePolyline = () => {
    // 기존 폴리라인이 있는 경우 제거
    if (polyline) {
      polyline.setMap(null);
    }

    // 마커가 2개 이상일 때만 폴리라인 생성
    if (markers.length >= 1) {
      const path = markers.map((marker) => marker.getPosition());
      const newPolyline = new window.kakao.maps.Polyline({
        path,
        strokeWeight: 3,
        strokeColor: '#00bfff',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });

      // 폴리라인 지도에 표시
      newPolyline.setMap(map);

      // 폴리라인 상태 업데이트
      setPolyline(newPolyline);
    }
  };

  return <div id="map" style={{ width: '31.25rem', height: '43.75rem', overflow: 'hidden', zIndex: '1' }} />;
};

export default MapContainer;