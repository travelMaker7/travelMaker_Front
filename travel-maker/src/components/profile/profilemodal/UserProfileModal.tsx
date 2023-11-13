import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileModal, { ProfileData } from "./ProfileModal";

interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get<ProfileData>(
          `/api/v1/mypage/profile/${userId}`
        );
        setProfileData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProfileData();
    }
  }, [userId, isOpen]);

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ProfileModal isOpen={isOpen} onClose={onClose} profileData={profileData} />
  );
};

export default UserProfileModal;
