// import React, { useState } from 'react';
// import axios from "axios";
// import styled from "styled-components";
// import MannerTemperatureBar from '../../profile/mypageprofile/MannerTemperatureBar';

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

// interface Props {
//   profileProp: ProfileData;
//   setProfile: React.Dispatch<React.SetStateAction<ProfileData>>; 
// }

// const ProfileComponent: React.FC<Props> = ({ profileProp, setProfile }) => {

  
//   const [description, setDescription] = useState(profileProp.userDescription);

 
//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

 
//   const handleProfileUpdate = async () => {
//     try {
      
//       const response = await axios.put('/api/v1/mypage/profile', {
//         ...profileProp,
//         userDescription: description,
//       });
//       console.log(response.data); 
//       alert('프로필이 업데이트 되었습니다.');
//     const updatedProfile = await axios.get('/api/v1/mypage/profile');
//     setProfile(updatedProfile.data); 
//   } catch (error) {
//     console.error('프로필 업데이트 실패:', error);
//     alert('프로필 업데이트에 실패했습니다.');
//   }
// };
  
//     return (
//       <ProfileWrapper>
//         <ProfileImageSection>
//         <ImageAndName>
//           <ProfileImage src={profileProp.imageUrl} alt={profileProp.nickname} />
//           <Name>{profileProp.nickname}</Name>
//         </ImageAndName>
//         <NameAndDetails>
//         <Details style={{marginBottom: "15px", borderBottom: "2px solid #848484"}}>{profileProp.userGender}</Details>
//         <Details style={{borderBottom: "2px solid #848484"}}>{profileProp.userAgeRange}</Details>
//         </NameAndDetails>
//         <MannerTemperatureBar />
//         </ProfileImageSection>
//         <ProfileDetails>
//         <IntroductionTitle style={{marginBottom:"-1px"}}>{profileProp.nickname}님 소개</IntroductionTitle> 
//         <TextArea value={description} onChange={handleDescriptionChange} />
//           <Button onClick={handleProfileUpdate}>프로필 수정</Button>
//         </ProfileDetails>
//       </ProfileWrapper>
//     );
//   };
  

// const ProfileWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   margin: 20px;

//   @media (max-width: 1024px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;
// const ProfileImageSection = styled.div`
//   display: flex;
//   flex-direction: row; 
//   align-items: flex-start; 
//   padding: 20px;
//   border-radius: 10px;
//   background: #fff;
//   box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
//   margin-right: 60px;
//   padding-left: 0px; 
//   width: 33%;
//   height: 150px;
// `;

// const ImageAndName = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-right: 10px;
//   height: 108px;
// `;


// const ProfileImage = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   margin-bottom: 10px;
// `;


// const ProfileDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 0px;
//   border-bottom: 2px solid skyblue;
//   width: 400px;
//   height: 108px;
//   position: relative; 
// `;

// const NameAndDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   font-size:13px;
//   margin-top: 4%;
//   font-weight: bold;
// `;

// const Name = styled.span`
//   width: 100px; 
//   height: 20px;
//   overflow: hidden; 
//   text-overflow: ellipsis; 
//   white-space: nowrap; 
//   font-size:13px;
//   font-weight:bold;
// `;


// const Details = styled.span`
//   font-size: 1em;
//   color: #555;
//   width:100%;
//   `;

// const TextArea = styled.textarea`
//   font-size: 0.9rem;
//   width: 100%;
//   height: 5rem;
//   padding: 0.5rem;
//   border: none;
//   margin-bottom: 1rem;
//   resize: none;
// `;

// const Button = styled.button`
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   width: 5rem;
//   height: 30px;
//   border-radius: 10px;
//   border: none;
//   background-color: #83d2ef;
//   color: #fff;
//   font-size: 0.8rem;
//   font-weight: 400;
//   cursor: pointer;
// `;

// const IntroductionTitle = styled.h3`
//   font-size: 11px;
//   color: #333;
//   margin-bottom: 10px; 
//   margin-top: -16px;
//   text-align: left;
// `;

// export default ProfileComponent;



// import React, { useState } from 'react';
// import axios from "axios";
// import styled from "styled-components";
// import MannerTemperatureBar from '../../profile/mypageprofile/MannerTemperatureBar';

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

// interface Props {
//   profileProp: ProfileData;
//   setProfile: React.Dispatch<React.SetStateAction<ProfileData>>; 
// }

// const ProfileComponent: React.FC<Props> = ({ profileProp, setProfile }) => {
//   const [description, setDescription] = useState(profileProp.userDescription);
//   const [loading, setLoading] = useState(false); // 로딩 상태 추가
//   const [error, setError] = useState(""); // 에러 메시지 상태 추가
 
//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

 
//   const handleProfileUpdate = async () => {
//     setLoading(true); // 업데이트 시작 전에 로딩 상태를 true로 설정
//     setError(""); // 에러 메시지 초기화
//     try {
      
//       const response = await axios.put('https://sosak.store/api/v1/mypage/profile', {
//         nickname: profileProp.nickname,
//         imageUrl: profileProp.imageUrl,
//         userAgeRange: profileProp.userAgeRange,
//         userGender: profileProp.userGender,
//         userDescription: description,
//       });
//       console.log(response.data); 
//       setProfile(response.data); // 성공적으로 업데이트된 데이터로 상태를 설정합니다.
//       alert('프로필이 업데이트 되었습니다.');
//     // const updatedProfile = await axios.get('https://sosak.store/api/v1/mypage/profile');
//     // setProfile(updatedProfile.data); 
//   } catch (error) {
//     console.error('프로필 업데이트 실패:', error);
//     setError('프로필 업데이트에 실패했습니다.'); // 에러 메시지를 상태에 설정
//   }finally {
//     setLoading(false); // 에러가 발생하든, 성공하든 로딩 상태를 false로 설정합니다.
//   }

// };
  
// if (loading) return <div>Loading...</div>;
// if (error) return <div>{error}</div>;

//     return (
//       <ProfileWrapper>
//         <ProfileImageSection>
//         <ImageAndDetails>
//         <ImageAndName>
//           <ProfileImage src={profileProp.imageUrl} alt={profileProp.nickname} />
//           <Name>{profileProp.nickname}</Name>
//         </ImageAndName>
//         <NameAndDetails>
//         <Details style={{marginBottom: "15px", borderBottom: "2px solid #848484"}}>{profileProp.userGender}</Details>
//         <Details style={{borderBottom: "2px solid #848484"}}>{profileProp.userAgeRange}</Details>
//         </NameAndDetails>
//         </ImageAndDetails>
//         <MannerBarWrapper>
//         <MannerTemperatureBar />
//         </MannerBarWrapper>
//         </ProfileImageSection>
//         <ProfileDetails>
//         <IntroductionTitle style={{marginBottom:"-1px"}}>{profileProp.nickname}님 소개</IntroductionTitle> 
//         <TextArea value={description} onChange={handleDescriptionChange} />
//         <Button onClick={handleProfileUpdate}>프로필 수정</Button>
//         </ProfileDetails>
//       </ProfileWrapper>
//     );
//   };

//   const MannerBarWrapper = styled.div`
//   /* align-self: stretch; // 부모 컨테이너의 전체 너비를 차지 */
//   margin-top: 0px; // 상단에서부터의 여백 추가
//   width: 99%; // 컨테이너의 너비를 설정
//   height: 34px;
// `;

// const ProfileWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   margin: 20px;
//   border-radius: 10px; // 둥근 모서리

//   @media (max-width: 1024px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const ImageAndDetails = styled.div`
//   display: flex; // Flexbox 레이아웃 사용
//   justify-content: space-between; // 내부 아이템 사이에 공간을 균등하게 배분
//   align-items: center; // 세로 방향으로 중앙 정렬
//   width: 100%; // 부모 컨테이너의 전체 너비를 차지

// `;

// const ProfileImageSection = styled.div`
//   display: flex;
//   flex-direction: column;// 가로 방향으로 항목을 정렬
//   align-items: center; // 세로 방향으로 중앙 정렬
//   /* justify-content: center; */
//   padding: 20px;
//   border-radius: 10px;
//   background: #fff;
//   box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
//   /* width: 33%; */
//   /* margin-right:60px; */
//   /* @media (max-width: 1024px) {
//     width: 100%;
//     margin-bottom: 20px;
//   } */
// `;


// const ImageAndName = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   flex: 1; // 필요한 공간을 균등하게 차지
//   margin-right: 20px; // 다음 항목과의 간격
//   height: 100px;
// `;



// const ProfileImage = styled.img`
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin-bottom: 10px;
// `;


// const ProfileDetails = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: #fff;
//   margin-left: 10%; // 이미지와 세부정보 사이의 간격
//   border-bottom: 2px solid #83d2ef; // 세부정보와 소개 사이의 간격
//   padding-bottom: 10px;
//   height: 100%;
//   width: 60%;
//   margin-top: -11px;
//   @media (max-width: 1024px) {
//     width: 100%;
//     margin-left: 0;
//   }

// `;

// const NameAndDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1; // 필요한 공간을 균등하게 차지
// `;
// const Name = styled.span`
//   width: 90px; 
//   height: 30px;
//   overflow: hidden; 
//   text-overflow: ellipsis; 
//   white-space: nowrap; 
//   font-size:13px;
//   font-weight:bold;
//   padding-top: 10px;
// `;


// const Details = styled.span`
//    font-size: 12px;
//    font-weight: bold;
//     color: #555;
//   /* margin-bottom: 15px; */
//   line-height: 1.5em;
//   height: auto;
//   /* text-align: left; */
//   max-height: 120px; // 최대 높이를 설정하여 이를 초과할 경우 스크롤바가 생깁니다.
//   overflow-y: auto; // 세로 스크롤바를 자동으로 표시하도록 설정
//   white-space: pre-line;
//   /* max-height: 120px; */
//   /* overflow-y: auto; */
//   padding-bottom: 1px;
//   padding-right: 9px;
//   `;
  

// const TextArea = styled.textarea`
//   font-size: 0.9rem;
//   width: 100%;
//   height: 5rem;
//   padding: 0.5rem;
//   border: none;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc; // 스타일을 위한 경계선 추가
//   overflow-y: auto; // 세로 스크롤바를 자동으로 표시하도록 설정
//   resize: none;
//   margin-bottom: 3rem; // 아래쪽 여백을 2rem으로 설정
// `;

// const Button = styled.button`
//   /* position: absolute; */
//   bottom: 10px;
//   right: 10px;
//   width: 5rem;
//   height: 30px;
//   border-radius: 10px;
//   border: none;
//   background-color: #83d2ef;
//   color: #fff;
//   font-size: 0.8rem;
//   font-weight: 400;
//   cursor: pointer;
//   margin-left: auto;
//   margin-right:-20px;
//   margin-top: -40px;
// `;

// const IntroductionTitle = styled.h3`
//   font-size: 1em;
//   color: #555;
//   margin-bottom: 15px;
//   line-height: 1.5em;
//   height: 50%;
//   text-align: left;
//   white-space: pre-line;
//   max-height: 120px;
//   overflow-y: auto;
// `;

// export default ProfileComponent;


// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import styled from "styled-components";
// import MannerTemperatureBar from '../../profile/mypageprofile/MannerTemperatureBar';

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

// interface Props {
//   profileProp: ProfileData;
//   setProfile: React.Dispatch<React.SetStateAction<ProfileData>>; 
// }

// const ProfileComponent: React.FC<Props> = ({ profileProp, setProfile }) => {
//   const [description, setDescription] = useState(profileProp.userDescription);
//   const [loading, setLoading] = useState(false); // 로딩 상태 추가
//   const [error, setError] = useState(""); // 에러 메시지 상태 추가
//   const [userInfo, setUserInfo] = useState({
//     nickname: '',
//     imageUrl: '',
//     userAgeRange: '',
//     userGender: '',
//   });

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         // 예시 URL, 실제 URL로 교체 필요
//         const response = await axios.get('https://sosak.store/api/v1/mypage/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`
//           }
//         });
//         console.log("Response:", response);
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('사용자 정보 가져오기 실패:', error);
//       }
//     };
//     fetchUserInfo();
//   }, []);

 
//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

 
//   const handleProfileUpdate = async () => {
//     setLoading(true); // 업데이트 시작 전에 로딩 상태를 true로 설정
//     setError(""); // 에러 메시지 초기화
//   //   try {
      
//   //     const response = await axios.put('https://sosak.store/api/v1/mypage/profile', {
//   //       nickname: profileProp.nickname,
//   //       imageUrl: profileProp.imageUrl,
//   //       userAgeRange: profileProp.userAgeRange,
//   //       userGender: profileProp.userGender,
//   //       userDescription: description,
//   //     });
//   //     setProfile(response.data); // 성공적으로 업데이트된 데이터로 상태를 설정합니다.
//   //     alert('프로필이 업데이트 되었습니다.');
//   //   // const updatedProfile = await axios.get('https://sosak.store/api/v1/mypage/profile');
//   //   // setProfile(updatedProfile.data); 
//   // } catch (error) {
//   //   console.error('프로필 업데이트 실패:', error);
//   //   setError('프로필 업데이트에 실패했습니다.'); // 에러 메시지를 상태에 설정
//   // }finally {
//   //   setLoading(false); // 에러가 발생하든, 성공하든 로딩 상태를 false로 설정합니다.
//   // }

// };
  
// if (loading) return <div>Loading...</div>;
// if (error) return <div>{error}</div>;

//     return (
//       <ProfileWrapper>
//         <ProfileImageSection>
//         <ImageAndDetails>
//         <ImageAndName>
//         <ProfileImage src={userInfo.imageUrl} alt={userInfo.nickname} />
//           <Name>{profileProp.nickname}</Name>
//         </ImageAndName>
//         <NameAndDetails>
//         <Details style={{marginBottom: "15px", borderBottom: "2px solid #848484"}}>{userInfo.userGender}</Details>
//         <Details style={{borderBottom: "2px solid #848484"}}>{userInfo.userAgeRange}</Details>
//         </NameAndDetails>
//         </ImageAndDetails>
//         <MannerBarWrapper>
//         <MannerTemperatureBar />
//         </MannerBarWrapper>
//         </ProfileImageSection>
//         <ProfileDetails>
//         <IntroductionTitle style={{marginBottom:"-1px"}}>{profileProp.nickname}님 소개</IntroductionTitle> 
//         <TextArea value={description} onChange={handleDescriptionChange} />
//         <Button onClick={handleProfileUpdate}>프로필 수정</Button>
//         </ProfileDetails>
//       </ProfileWrapper>
//     );
//   };

//   const MannerBarWrapper = styled.div`
//   /* align-self: stretch; // 부모 컨테이너의 전체 너비를 차지 */
//   margin-top: 0px; // 상단에서부터의 여백 추가
//   width: 99%; // 컨테이너의 너비를 설정
//   height: 34px;
// `;

// const ProfileWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   margin: 20px;
//   border-radius: 10px; // 둥근 모서리

//   @media (max-width: 1024px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const ImageAndDetails = styled.div`
//   display: flex; // Flexbox 레이아웃 사용
//   justify-content: space-between; // 내부 아이템 사이에 공간을 균등하게 배분
//   align-items: center; // 세로 방향으로 중앙 정렬
//   width: 100%; // 부모 컨테이너의 전체 너비를 차지

// `;

// const ProfileImageSection = styled.div`
//   display: flex;
//   flex-direction: column;// 가로 방향으로 항목을 정렬
//   align-items: center; // 세로 방향으로 중앙 정렬
//   /* justify-content: center; */
//   padding: 20px;
//   border-radius: 10px;
//   background: #fff;
//   box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
//   /* width: 33%; */
//   /* margin-right:60px; */
//   /* @media (max-width: 1024px) {
//     width: 100%;
//     margin-bottom: 20px;
//   } */
// `;


// const ImageAndName = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   flex: 1; // 필요한 공간을 균등하게 차지
//   margin-right: 20px; // 다음 항목과의 간격
//   height: 100px;
// `;



// const ProfileImage = styled.img`
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin-bottom: 10px;
// `;


// const ProfileDetails = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: #fff;
//   margin-left: 10%; // 이미지와 세부정보 사이의 간격
//   border-bottom: 2px solid #83d2ef; // 세부정보와 소개 사이의 간격
//   padding-bottom: 10px;
//   height: 100%;
//   width: 60%;
//   margin-top: -11px;
//   @media (max-width: 1024px) {
//     width: 100%;
//     margin-left: 0;
//   }

// `;

// const NameAndDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1; // 필요한 공간을 균등하게 차지
// `;
// const Name = styled.span`
//   width: 90px; 
//   height: 30px;
//   overflow: hidden; 
//   text-overflow: ellipsis; 
//   white-space: nowrap; 
//   font-size:13px;
//   font-weight:bold;
//   padding-top: 10px;
// `;


// const Details = styled.span`
//    font-size: 12px;
//    font-weight: bold;
//     color: #555;
//   /* margin-bottom: 15px; */
//   line-height: 1.5em;
//   height: auto;
//   /* text-align: left; */
//   max-height: 120px; // 최대 높이를 설정하여 이를 초과할 경우 스크롤바가 생깁니다.
//   overflow-y: auto; // 세로 스크롤바를 자동으로 표시하도록 설정
//   white-space: pre-line;
//   /* max-height: 120px; */
//   /* overflow-y: auto; */
//   padding-bottom: 1px;
//   padding-right: 9px;
//   `;
  

// const TextArea = styled.textarea`
//   font-size: 0.9rem;
//   width: 100%;
//   height: 5rem;
//   padding: 0.5rem;
//   border: none;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc; // 스타일을 위한 경계선 추가
//   overflow-y: auto; // 세로 스크롤바를 자동으로 표시하도록 설정
//   resize: none;
//   margin-bottom: 3rem; // 아래쪽 여백을 2rem으로 설정
// `;

// const Button = styled.button`
//   /* position: absolute; */
//   bottom: 10px;
//   right: 10px;
//   width: 5rem;
//   height: 30px;
//   border-radius: 10px;
//   border: none;
//   background-color: #83d2ef;
//   color: #fff;
//   font-size: 0.8rem;
//   font-weight: 400;
//   cursor: pointer;
//   margin-left: auto;
//   margin-right:-20px;
//   margin-top: -40px;
// `;

// const IntroductionTitle = styled.h3`
//   font-size: 1em;
//   color: #555;
//   margin-bottom: 15px;
//   line-height: 1.5em;
//   height: 50%;
//   text-align: left;
//   white-space: pre-line;
//   max-height: 120px;
//   overflow-y: auto;
// `;

// export default ProfileComponent;


import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import MannerTemperatureBar from '../../profile/mypageprofile/MannerTemperatureBar';

interface ProfileData {
  nickname: string;
  imageUrl: string;
  userAgeRange: string;
  userGender: string;
  userDescription: string;
  photographer: number;
  timeIsGold: number;
  kingOfKindness: number;
  professionalGuide: number;
  mannerScore: number;
}


const ProfileComponent: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    imageUrl: '',
    userAgeRange: '',
    userGender: '',
    userDescription: '',
    photographer: 0,
    timeIsGold: 0,
    kingOfKindness: 0,
    professionalGuide: 0,
    mannerScore: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://sosak.store/api/v1/mypage/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log("Fetched Data:", response.data); // 전체 응답 데이터를 콘솔에 출력
        console.log("Manner Score:", response.data.data.mannerScore); // 매너 점수를 콘솔에 출력
        setProfileData(response.data.data);
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const calculateBarWidth = (): string => {
    if (!profileData) return "0%";
    const widthPercentage = ((profileData.mannerScore - 20) / 30) * 100;
    return `${Math.min(Math.max(widthPercentage, 0), 100)}%`;
  };



  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, userDescription: event.target.value });
  };
 
  const handleProfileUpdate = async () => {
    setLoading(true); // 업데이트 시작 전에 로딩 상태를 true로 설정
    setError(""); // 에러 메시지 초기화
    try {
      const response = await axios.put('https://sosak.store/api/v1/mypage/profile', {
      nickname: profileData.nickname,
      imageUrl: profileData.imageUrl,
      userAgeRange: profileData.userAgeRange,
      userGender: profileData.userGender,
      userDescription: profileData.userDescription,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}` // 필요에 따라 인증 토큰 추가
      }


    });

      // const response = await axios.get('https://sosak.store/api/v1/mypage/profile');
      setProfileData(response.data.data);
      alert('프로필이 업데이트 되었습니다.');
    
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    setError('프로필 업데이트에 실패했습니다.'); 
  }finally {
    setLoading(false); 
  }

};
  
if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;


    return (
      <ProfileWrapper>
        <ProfileImageSection>
        <ImageAndDetails>
        <ImageAndName>
        <ProfileImage src={profileData.imageUrl} alt={profileData.nickname} />
          <Name>{profileData.nickname}</Name>
        </ImageAndName>
        <NameAndDetails>
        <Details style={{marginBottom: "15px", borderBottom: "2px solid #848484"}}>{profileData.userGender}</Details>
        <Details style={{borderBottom: "2px solid #848484"}}>{profileData.userAgeRange}</Details>
        </NameAndDetails>
        </ImageAndDetails>
        <MannerBarWrapper>
          <MannerTemperatureBar width={calculateBarWidth()} />
        </MannerBarWrapper>
        </ProfileImageSection>
        <ProfileDetails>
        <IntroductionTitle style={{marginBottom:"-1px"}}>{profileData.nickname}님 소개</IntroductionTitle> 
        <TextArea value={profileData.userDescription} onChange={handleDescriptionChange} />
        <Button onClick={handleProfileUpdate}>프로필 수정</Button>
        </ProfileDetails>
      </ProfileWrapper>
    );
  };

  const MannerBarWrapper = styled.div`
  
  margin-top: -20px; 
  width: 99%;
  height: 34px;
`;

// const ProfileWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   margin: 25px;
//   border-radius: 10px; 

//   @media (max-width: 1024px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 박스 사이에 공간 추가 */
  align-items: flex-start;
  /* margin: 25px; */
  /* padding: 20px; // 내부 여백을 추가 */
  width: 100%; // 부모 요소의 너비를 화면에 맞춤
  /* min-height: 500px; // 최소 높이를 지정 */
  border-radius: 10px;
  background: #fff;
  /* box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15); */

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageAndDetails = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  width: 100%; 
`;

// const ProfileImageSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center; 
//   /* justify-content: center; */
//   padding: 20px;
//   border-radius: 10px;
//   background: #fff;
//   box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
//   /* width: 33%; */
//   /* margin-right:60px; */
//   /* @media (max-width: 1024px) {
//     width: 100%;
//     margin-bottom: 20px;
//   } */
// `;
const ProfileImageSection = styled.div`
 /* flex: 0 0 30%; // flex-grow: 0, flex-shrink: 0, flex-basis: 30% */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  flex-basis: 30%; /* 이미지 박스 크기를 전체의 30%로 설정 */
  background: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
  margin-right: 3rem; /* 오른쪽 여백 추가 */

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;


const ImageAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; // 필요한 공간을 균등하게 차지
  margin-right: 20px; // 다음 항목과의 간격
  height: 100px;
`;



const ProfileImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 0px;
  margin-top: 0px;;
  
`;


// const ProfileDetails = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: #fff;
//   margin-left: 10%; 
//   border-radius: 10px;
//   background: #fff;
//   box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
//   padding-bottom: 10px;
//   height: 100%;
//   width: 60%;
//   margin-top: -11px;
 
//   @media (max-width: 1024px) {
//     width: 100%;
//     margin-left: 0;
//   }

// `;
const ProfileDetails = styled.div`
  position: relative; // 이 부분이 중요합니다
  padding-bottom: 40px; // 버튼 높이와 마진의 합만큼 추가합니다
  &::after {
    content: '';
    display: block;
    height: 30px; // 버튼의 높이와 마진을 고려한 값
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  flex-basis: 65%; /* '님 소개' 박스 크기를 전체의 65%로 설정 */
  background: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.15);
  /* 높이가 자동으로 조정되도록 min-height를 제거합니다. */
  flex-grow: 1; 
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
`;
const NameAndDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 35px;
`;
const Name = styled.span`
  width: 90px; 
  height: 30px;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  font-size:13px;
  font-weight:bold;
  padding-top: 10px;
`;


const Details = styled.span`
   font-size: 12px;
   font-weight: bold;
    color: #555;
  /* margin-bottom: 15px; */
  line-height: 1.5em;
  height: auto;
  /* text-align: left; */
  max-height: 120px;
  overflow-y: auto; 
  white-space: pre-line;
  /* max-height: 120px; */
  /* overflow-y: auto; */
  padding-bottom: 1px;
  padding-right: 9px;
  `;
  

// const TextArea = styled.textarea`
//   font-size: 0.9rem;
//   width: 90%;
//   height: 1rem;
//   padding: 0.5rem;
//   border: none;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc; 
//   border-radius:10px;
//   overflow-y: auto;
//   resize: none;
//   margin-bottom: 3rem; 
//   margin-left: 15px;
//   padding-bottom: 50px;
// `;
const TextArea = styled.textarea`
  font-size: 0.9rem;
  width: 99%;
  height: 3rem; /* 필요에 따라 높이 조정 */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
  resize: none;
  margin-left: -7px;
  padding-bottom: 10px;
`;
const Button = styled.button`
  position: absolute;
  /* top: 290px;
  left: 1000px; */
  right: 20px;
  top: 110px;
  width: 4rem;
  height: 25px;
  border-radius: 10px;
  border: none;
  background-color: #83d2ef;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  margin-left: auto;
  margin-right:-7px;
  margin-top: 5px;
`;

const IntroductionTitle = styled.h3`
  font-size: 0.7em;
  color: #555;
  margin-top: -10px;
  /* margin-bottom: -10px; */
  padding-bottom: 10px;
  line-height: 1.5em;
  height: 20%;
  text-align: left;
  white-space: pre-line;
  max-height: 120px;
  overflow-y: auto;
  /* margin-left:0px; */
`;

export default ProfileComponent;



