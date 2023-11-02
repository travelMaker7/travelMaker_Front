// import React, { ReactNode, useEffect, useState } from 'react';
// import Dropdown from '@/utils/Dropdown';
// import styled, { keyframes } from 'styled-components';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
// import axios from 'axios';


// interface DayListItem {
//   id: string;
//   dayLabel: string;
//   scheduleDate: string;
//   children: PlaceListItem[];
//   isOpen: boolean;
//   wishJoin: boolean;
// }

// interface PlaceListItem {
//   id: string;
//   destinationName: string;
//   orderedLabel: number;
//   wishJoin: boolean;
//   isOpen: boolean;
//   children : PlaceDetailListItem[]
// }

// interface PlaceDetailListItem {
//   wishCnt: number;
//   address: string;
//   arriveTime: string;
//   leaveTime: string;
// }

// const ToggleList: React.FC = () => {

//   const [list, setList] = useState<DayListItem[]>([]);


//   // const addPlace = () => {
//   //   axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,{
//   //     headers: { Authorization: `KakaoAK ${process.env.VITE_KAKAOLOCALRESTKEY}` }
//   //   }).then((res) => {
//   //     console.log(res);
//   //   })
//   // }

  

//   const toggleDayItem = (item: DayListItem) => {
//     item.isOpen = !item.isOpen;
//     setList([...list]);
//   };

//   const togglePlaceItem = (item: PlaceListItem) => {
//     item.isOpen = !item.isOpen;
//     setList([...list]);
//   };

//   const renderDayList = (items: DayListItem[]) => {
//     return items.map((item) => (
//       <DayToggleList key={item.id}>
//         <DayThemeDiv>
//           <WbSunnyIcon style={{color: 'white', marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem'}}/> 
//           <CountDayDiv>
//             Day1
//           </CountDayDiv>
//         </DayThemeDiv>
//         <DayDiv>
//             11월 21일
//         </DayDiv>
//         <DeleteIconDiv>
//           <DeleteIcon/>
//         </DeleteIconDiv>
//         <DayTogglebutton onClick={() => toggleDayItem(item)}>
//           <ArrowForwardIosIcon/>
//         </DayTogglebutton>
//         {item.isOpen && item.children && renderPlaceList(item.children)}
//       </DayToggleList>
//     ));
//   };

//   const renderPlaceList = (items: PlaceListItem[]) => {
    
//     if (items) {
//       return items.map((item) => (
//         <div key={item.id}>
//           <div>
//             <div>동그라미</div>
//             <div>장소 이름</div>
//             <div>동행여부</div>
//             <div>토글</div>
//             <div>
//               <DeleteIcon/>
//             </div>
//             <div>
//               <EditLocationAltIcon/>
//             </div>
//             <div onClick={() => togglePlaceItem(item)}>
//               <ArrowForwardIosIcon/>
//             </div>
//           </div>
//           {item.isOpen ? (
//             <div>
//               <div>
//                 <div>상세주소</div>
//                 <div>어쩌구저쩌구 주소값</div>
//               </div>
//               <div>
//                 <div>동행인원</div>
//                 <input>7명</input>
//               </div>
//               <div>
//                 <div>여행 시간</div>
//                 <div>
//                   <input>19:00</input> ~ <input>20:00</input>
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       ));
//     }
    
//     return null;
    
//   };
  
//   return (
//     <>
//       {renderDayList(list)}
//       {renderPlaceList(list[0].children)}
//     </>
//   );
// };

// export default ToggleList;

// const DayToggleList = styled.div`
//   width: 31.25rem;
//   height: 3.75rem;
//   display : flex;
//   justify-content: start;
//   align-items: center;
// `

// const DayTogglebutton = styled.button`
//   border: none;
//   width: 3rem;
//   height: 3rem;
//   text-align: center;
//   background-color: white;
// `

// const DayThemeDiv = styled.div`
//   width: 5rem;
//   height: 2rem;
//   border-radius: 1.25rem;
//   display: flex;
//   align-items: center;
//   background-color: #00315e;
//   margin-left: 1rem;
//   font-size: 0.95rem;
// `

// const DayDiv = styled.div`
//   color: gray;
//   font-size: 0.8rem;
//   text-align: center;
//   line-height: 0.75rem;
//   border: none;
//   margin-left: 0.8rem;
// `

// const CountDayDiv = styled.div`
//   color: white;
//   text-align: center;
//   margin-left: 0.5rem;
// `

// const PlaceSearchDiv = styled.div`
//   width: 100%;
//   height: 3rem;
//   border: none;
// `

// const PlaceSearchTheme = styled.div`
//   width: 5rem;
//   height: 2.5rem;
//   border: none;
// `

// const PlaceDetailAddress = styled.input`
//   width: 20rem;
//   height: 2.5rem;
//   border: 1px #ebebeb solid; 
// `

// // const PlaceSearchButton = styled.button`
// //   width: 5rem;
// //   height: 2.5rem;
// //   background-color: #8CC4F8;
// //   color: white;
// //   border-radius: 0.875rem;
// //   border: none;
// // `

// const AccompanyPeopleDiv = styled(PlaceSearchDiv)`
// ` 

// const AccompanyPeopleTheme = styled(PlaceSearchTheme)`
// `

// const AccompanyPeopleSelect = styled.select`
//   width: 5rem;
//   height: 2.5rem;
//   background-color: #ebebeb;
//   border: none;
//   border-radius: 0.125rem;
// `

// const PlaceAddDiv = styled(PlaceSearchDiv)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const PlaceAddButton = styled.button`
//   width: 6rem;
//   height: 3rem;
//   background-color: #8CC4F8;
//   color: white;
//   border-radius: 0.875rem;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
// const DeleteIconDiv = styled.div`
//   width: 3rem;
//   height: 3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: 15rem;
// `

// const EditIconDiv = styled(DeleteIconDiv)``;

