import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

const LocalMap = () => {
  const [hasMakers, setHasMakers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [tag] = useSearchParams();
  const region = tag.get('region');

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        createMap();
      } else {
        const script = document.createElement('script');
        script.onload = () => createMap();
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=5331b33365ad574b5821063aa314b864&autoload=false';
        document.head.appendChild(script);
      }
    };

    const createMap = () => {
      axios.get(`https://sosak.store/api/v1/map/${region}`, {
        headers: {
          "Content-type": "application/json"
        }
      })
      .then((res) => {
        const makers = res.data.data.makers;
        if (makers && makers.length > 0) {
          setHasMakers(true);
          const container = document.getElementById('map');
          if (container) {
            window.kakao.maps.load(() => {
              const options = {
                center: new window.kakao.maps.LatLng(37.5797, 126.977),
                level: 3
              };
              const map = new window.kakao.maps.Map(container, options);
              let bounds = new window.kakao.maps.LatLngBounds(); // bounds 초기화

              let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
              let imageSize = new window.kakao.maps.Size(24, 35);  
              let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 

              makers.forEach((maker: { destinationY: string; destinationX: string; destinationName: string; address: string; }) => {
                let position = new window.kakao.maps.LatLng(maker.destinationY, maker.destinationX);
                let marker = new window.kakao.maps.Marker({
                  map: map,
                  position: position,
                  title: maker.destinationName,
                  image: markerImage
                });

                let infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;">${maker.destinationName}<br>${maker.address}</div>`
                });

                window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
                window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

                bounds.extend(position);
              });
              map.setBounds(bounds);
            });
          }
        } else {
          setHasMakers(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("조회 오류 발생 ", error);
        setHasMakers(false);
        setIsLoading(false);
      });
    };

    loadKakaoMapScript();
  }, [region]);

  if (isLoading) {
    return <LoadingDiv>Loading...</LoadingDiv>; 
  }

  return (
    hasMakers ? (
      <Map id="map" style={{ width: "59.375rem", height: "45rem", overflow: "hidden" }}/>
    ) : (
      <NoDataDiv>등록된 여행지가 존재하지 않습니다.</NoDataDiv>
    )
  );
}

export default LocalMap; 

const Map = styled.div`
  position: relative;
`

const NoDataDiv = styled.div`
  width: 59.375rem;
  height: 45rem;
  font-weight: border;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingDiv = styled.div`
  width: 59.375rem;
  height: 45rem;
  font-weight: border;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
