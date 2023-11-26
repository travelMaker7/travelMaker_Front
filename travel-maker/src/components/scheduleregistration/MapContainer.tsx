import React, { useEffect } from 'react';
import { XYDataProps } from '@/pages/scheduleregistration/ScheduleRegistrationPage';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer: React.FC<XYDataProps> = ({ xyData, setXyData }) => {
  useEffect(() => {
    let container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 7, // 지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // xyData가 유효한 배열일 경우에만 실행
    if (Array.isArray(xyData) && xyData.length > 0) {
      // 각 좌표에 마커를 표시
      xyData.forEach((coord, index) => {
        const markerPosition = new window.kakao.maps.LatLng(coord[0], coord[1]);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도 위에 표시합니다
        marker.setMap(map);
      });
    }
  }, [xyData]); // xyData가 변경될 때마다 useEffect가 실행되도록 설정

  return <div id="map" style={{ width: '31.25rem', height: '43.75rem', overflow: 'hidden', zIndex: '1' }} />;
};

export default MapContainer;