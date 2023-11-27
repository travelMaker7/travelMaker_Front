import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    nickname: "",
    imageUrl: "",
    userAgeRange: "",
    userGender: "",
    userDescription: "",
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
        const response = await axios.get(
          "https://sosak.store/api/v1/mypage/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log("Fetched Data:", response.data); // 전체 응답 데이터를 콘솔에 출력
        console.log("Manner Score:", response.data.data.mannerScore); // 매너 점수를 콘솔에 출력
        setProfileData(response.data.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        setError("사용자 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // const calculateBarWidth = (): string => {
  //   if (!profileData) return "0%";
  //   const widthPercentage = ((profileData.mannerScore - 20) / 30) * 100;
  //   return `${Math.min(Math.max(widthPercentage, 0), 100)}%`;
  // };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfileData({ ...profileData, userDescription: event.target.value });
  };

  const navigate = useNavigate();
  const navigateToMyPage = () => {
    navigate("/mypage?");
  };

  const handleProfileUpdate = async () => {
    setLoading(true); // 업데이트 시작 전에 로딩 상태를 true로 설정
    setError(""); // 에러 메시지 초기화
    try {
      const response = await axios.put(
        "https://sosak.store/api/v1/mypage/update/description",
        {
          nickname: profileData.nickname,
          imageUrl: profileData.imageUrl,
          userAgeRange: profileData.userAgeRange,
          userGender: profileData.userGender,
          userDescription: profileData.userDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // const response = await axios.get('https://sosak.store/api/v1/mypage/profile');
      setProfileData(response.data.data);
      alert("프로필이 업데이트 되었습니다.");
      // navigateToMyPage();
      navigate(0);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      setError("프로필 업데이트에 실패했습니다.");
    } finally {
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
            <ProfileImage
              src={profileData.imageUrl}
              alt={profileData.nickname}
            />
            {/* <Name>{profileData.nickname}</Name> */}
          </ImageAndName>
          <NameAndDetails>
            <Details
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #70b9d6",
              }}
            >
              {profileData.userGender}
            </Details>
            <Details style={{ borderBottom: "1px solid #70b9d6" }}>
              {profileData.userAgeRange}
            </Details>
          </NameAndDetails>
        </ImageAndDetails>
        {/* <MannerBarWrapper>
          <MannerTemperatureBar width={calculateBarWidth()} />
        </MannerBarWrapper> */}
      </ProfileImageSection>
      <ProfileDetails>
        <IntroductionTitle style={{ marginBottom: "-1px" }}>
          {profileData.nickname}님 소개
        </IntroductionTitle>
        <TextArea
          value={profileData.userDescription}
          onChange={handleDescriptionChange}
        />
        <Button onClick={handleProfileUpdate}>프로필 수정</Button>
      </ProfileDetails>
    </ProfileWrapper>
  );
};

// const MannerBarWrapper = styled.div`
//   margin-top: -20px;
//   width: 99%;
//   height: 34px;
// `;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  justify-content: flex-start;
  align-items: flex-start;
  margin: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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

const ProfileImageSection = styled.div`
  /* flex: 0 0 30%; // flex-grow: 0, flex-shrink: 0, flex-basis: 30% */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  width: 15rem;
  height: 10rem;
  background: #fff;
  /* box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15); */
`;

const ImageAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-right: 20px;
  height: auto;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ProfileDetails = styled.div`
  position: relative; // 이 부분이 중요합니다
  padding-bottom: 40px; // 버튼 높이와 마진의 합만큼 추가합니다
  &::after {
    content: "";
    display: block;
    height: 30px; // 버튼의 높이와 마진을 고려한 값
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  /* border-radius: 10px; */
  border-left: 1px solid #ddd;
  width: 50rem;
  height: 10rem;
  background: #fff;
  /* box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15); */
  /* 높이가 자동으로 조정되도록 min-height를 제거합니다. */
  /* flex-grow: 1; */
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: bold;
  padding-top: 10px;
`;

const Details = styled.span`
  font-size: 13px;
  color: #555;
  line-height: 1.5em;
  overflow-y: auto;
  white-space: pre-line;
  padding-bottom: 1px;
`;

const TextArea = styled.textarea`
  font-size: 0.9rem;
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  border: 1px solid #ccc;
  overflow-y: auto;
  resize: none;
  padding-bottom: 10px;

  &:focus {
    border: 1px solid #70b9d6;
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  /* top: 290px;
  left: 1000px; */
  right: 10px;
  bottom: 10px;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: white;
  color: #70b9d6;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #70b9d6;
    color: white;
  }
`;

const IntroductionTitle = styled.h3`
  font-size: 1rem;
  color: #70b9d6;
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
