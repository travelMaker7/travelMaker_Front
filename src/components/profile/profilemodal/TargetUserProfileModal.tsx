// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProfileModal from "./UserProfileModal";
// import {ProfileData, ProfileModalProps} from "./ProfileInfo";



// const TargetUserProfileModal: React.FC<ProfileModalProps> = ({
//   isOpen,
//   onClose,
//   profileData
// }) => {
//   const [profileData, setProfileData] = useState<ProfileData>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (!targetUserId) return;

//       try {
//         setLoading(true);
//         const response = await axios.get<ProfileData>(
//           `/api/v1/mypage/profile/${targetUserId}`
//         );
//         console.log('타인 프로필 조회 : ', response.data);
        
//         setProfileData(response.data);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isOpen) {
//       fetchProfileData();
//     }
//   }, [targetUserId, isOpen]);

//   if (!isOpen) return null;
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <ProfileModal isOpen={isOpen} onClose={onClose} profileData={profileData} />
//   );
// };

// export default TargetUserProfileModal;
