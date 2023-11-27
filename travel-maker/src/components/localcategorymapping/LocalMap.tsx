import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

const RES = {
  "status": 201,
  "message": "마커들 가져오기 성공",
  "data":{
		"makers" : [{
			"destinationName": "경복궁",
			"address" : "서울 종로구 사직로 161",
			"destinationY": "37.5797", // 위도
	    "destinationX": "126.977", // 경도
		},
		{
			"destinationName": "경복궁",
			"address" : "서울 종로구 사직로 161",
			"destinationY": "37.5797", // 위도
	    "destinationX": "126.977", // 경도
		},
    {
			"destinationName": "창덕궁",
			"address" : "서울 종로구 사직로 163",
			"destinationY": "37.5796", // 위도
	    "destinationX": "126.976", // 경도
		},
    {
			"destinationName": "광화문",
			"address" : "서울 종로구 사직로 163",
			"destinationY": "37.5795", // 위도
	    "destinationX": "126.975", // 경도
		}]
  }
}

const region = "서울";



const LocalMap: React.FC = () => {

  let [tag, setTag] = useSearchParams();
    
  const region = tag.get('region');

    useEffect(() => {
      
      axios.get(`https://sosak.store/api/v1/map/${region}`, {
          headers: {
          "Content-type": "application/json"
        }
      })
      .then((res) => {
        console.log('res: ',res);
        console.log("조회 성공");
      })
      .catch((error) => {
        console.error("조회 오류 발생");
      })

      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(37.5797, 126.977), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
  
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      const {data: {makers}} = RES;
      console.log("makers", makers);
      const setMakers = new Set(makers);
      console.log("setMakers", setMakers);
      const arrSetMakers = [...setMakers];
      console.log("arrSetMakers", arrSetMakers);
      const data: { content: any, LatLng: any, title: any, image: any }[] = [];

      let bounds = new window.kakao.maps.LatLngBounds();

      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

      // 마커 이미지의 이미지 크기 입니다
      let imageSize = new window.kakao.maps.Size(24, 35); 
        
      // 마커 이미지를 생성합니다    
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 

      for(let i=0; i<arrSetMakers.length; i++) {
        data.push({
          content:`
            <InfoWindowDiv>
              <div>${arrSetMakers[i].destinationName}</div>
              <div>${arrSetMakers[i].address}</div>
            <InfoWindowDiv>
            `,
          LatLng: new window.kakao.maps.LatLng(arrSetMakers[i].destinationY, arrSetMakers[i].destinationX),
          title: arrSetMakers[i].destinationName,
          image: markerImage
        })
      };
      
      console.log("data", data);

      for (let i = 0; i < arrSetMakers.length; i ++) {
        
        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: data[i].LatLng, // 마커의 위치
            title: data[i].title,
            image: markerImage
        });
        marker.setMap(map);
        bounds.extend(data[i].LatLng);
    
        // 마커에 표시할 인포윈도우를 생성합니다 
        let infowindow = new window.kakao.maps.InfoWindow({
            content: data[i].content // 인포윈도우에 표시할 내용
        });
    
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }

    function setBounds() {
      map.setBounds(bounds);
    };   

    
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
    function makeOverListener(map: any, marker: any, infowindow: { open: (arg0: any, arg1: any) => void; }) {
        return function() {
            infowindow.open(map, marker);
        };
    }
    
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow: { close: () => void; }) {
        return function() {
            infowindow.close();
        };
    }

    const button = document.getElementById('setBoundsButton');
  if (button) {
    button.addEventListener('click', setBounds);
  }

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    if (button) {
      button.removeEventListener('click', setBounds);
    }
  };
  
  }, [])

  return (
      <Map id="map" style={{ width: "59.375rem", height: "45rem", overflow: "hidden" }}>
        <ResetSearchBtn id='setBoundsButton'>범위 재설정</ResetSearchBtn>
      </Map>
  );
}

export default LocalMap; 

const Map = styled.div`
  position: relative;
`


const ResetSearchBtn = styled.button`
  position: absolute;
  width: 7.5rem;
  height: 2.5rem;
  z-index: 99;
  left: 1rem;
  bottom: 2rem;
  background-color: #8cc3f8;
  border: none;
  font-weight: bolder;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.25rem 0 #b6b3b3;
  color: white;
  font-size: 1.125rem;

`



