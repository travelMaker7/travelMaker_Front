export interface ProfileData {
    imageUrl?: string;
    nickname?: string;
    userGender?: string;
    userAgeRange?: string;
    userDescription?: string;
    photographer?: number,
    timeIsGold?: number,
    kingOfKindness?: number,
    professionalGuide?: number,
    mannerScore?: number
}
export interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileData?: ProfileData;
    targetUserId?:number;
}
