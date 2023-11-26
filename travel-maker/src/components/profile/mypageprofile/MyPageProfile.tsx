// import React, { useState, useEffect } from 'react';
// import ProfileComponent from './ProfileComponent'; // 수정해주세요
// import MannerTemperatureBar from './MannerTemperatureBar'; // 수정해주세요

// interface ProfileData {
//   nickname: string;
//   imageUrl: string;
//   userAgeRange: string;
//   userGender: string;
//   userDescription: string;
//   photographer: number;
//   timeIsGold: number;
//   kingOfKindness: number;
//   professionalGuide: number;
//   mannerScore: number;
// }

// const MyPageProfileTest: React.FC = () => {
//   const [profile, setProfile] = useState<ProfileData | null>(null);

//   useEffect(() => {
//     fetch('https://sosak.store/api/v1/mypage/profile')
//       .then(response => response.json())
//       .then(data => {
//         setProfile(data);
//       })
//       .catch(error => {
//         console.error('프로필 데이터를 가져오는 중 오류 발생', error);
//       });
//   }, []);

//   const calculateBarWidth = (): string => {
//     if (!profile) return '0%';
//     const widthPercentage = (profile.mannerScore - 35) * 10;
//     return `${Math.min(Math.max(widthPercentage, 0), 100)}%`;
//   };

//   if (!profile) return <div>Loading...</div>; // 프로필 데이터가 로드되지 않은 경우

//   return (
//     <div>
//       <div style={{ marginBottom: '40px' }}>
//         <ProfileComponent {...profile} /> {/* 프로필 컴포넌트에 데이터 전달 */}
//       </div>
//       <MannerTemperatureBar width={calculateBarWidth()} />
//     </div>
//   );
// };

// export default MyPageProfileTest;




//더미데이터활용로직

// import React, { useState, useEffect } from "react";
// import ProfileComponent from "./ProfileComponent";
// import MannerTemperatureBar from "./MannerTemperatureBar";
// import axios from "axios";

// interface ProfileData {
//   nickname: string;
//   imageUrl: string;
//   userAgeRange: string;
//   userGender: string;
//   userDescription: string;
//   photographer: number;
//   timeIsGold: number;
//   kingOfKindness: number;
//   professionalGuide: number;
//   mannerScore: number;
// }



// const MyPageProfile: React.FC = () => {
//   const [profile, setProfile] = useState<ProfileData>();

//   useEffect(() => {
//     axios
//       .get("'https://sosak.store/api/v1/mypage/profile")
//       .then((response) => {
//         setProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("프로필 데이터를 가져오는 중 오류 발생", error);
//       });
//   }, []);

//   const calculateBarWidth = (): string => {
//     if (!profile) return "0%";
//     const widthPercentage = ((profile.mannerScore - 20) / 30) * 100;
//     return `${Math.min(Math.max(widthPercentage, 0), 100)}%`;
//   };

//   if (!profile) return <div>Loading...</div>;

//   return (
//     <div>
//       <div style={{ marginBottom: "40px" }}>
//         <ProfileComponent profile={profile} setProfile={setProfile} />
//       </div>
//       {/* <MannerTemperatureBar width={calculateBarWidth()} /> */}
//     </div>
//   );
// };

// export default MyPageProfile;
