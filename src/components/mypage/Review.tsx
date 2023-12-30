import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

interface User {
    userId: number;
    username: string;
    imageUrl: string;
}

interface ReviewItemProps {
    name: string;
    label: string;
    onClick: () => void;
    selected: boolean;
}

interface Props {
    users: User[];
    tripPlanId: string;
    onClose: () => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
    label,
    onClick,
    selected,
}) => (
    <ReviewBadge onClick={onClick} selected={selected}>
        {label}
    </ReviewBadge>
);

const Review: React.FC<Props> = ({ users, tripPlanId, onClose }) => {
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [reviewItems, setReviewItems] = useState({
        mannerScore: 0,
        photographer: 0,
        timeIsGold: 0,
        kingOfKindness: 0,
        professionalGuide: 0,
    });
    const handleUserSelect = (userId: number) => {
        setSelectedUser(userId);
    };

    const handleReviewItemClick = (item: keyof typeof reviewItems) => {
        setReviewItems({ ...reviewItems, [item]: reviewItems[item] ? 0 : 1 });
    };
    const submitReview = async () => {
        if (!selectedUser) {
            alert('리뷰를 작성할 사용자를 선택해주세요.');
            return;
        }
        const reviewData = {
            tripPlanId,
            reviewTargetId: selectedUser,
            ...reviewItems,
        };

        try {
            const response = await axios.post(
                'https://sosak.store/api/v1/review',
                reviewData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log('리뷰 등록 완료', response);
                alert('리뷰가 등록되었습니다.');
                onClose();
            } else {
                console.log('리뷰 등록 실패', response);
                alert('리뷰 등록에 실패했습니다.');
            }
        } catch (error) {
            console.log('리뷰 등록 중 오류 발생', error);
            alert('리뷰 등록에 실패했습니다.');
        }
    };

    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>리뷰</ModalTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                <UserList>
                    {users.map((user) => (
                        <div key={user.userId}>
                            <UserItem
                                onClick={() => handleUserSelect(user.userId)}
                            >
                                <UserImage
                                    src={user.imageUrl}
                                    alt={user.username}
                                />
                                <UserName>{user.username}</UserName>
                            </UserItem>
                            {selectedUser === user.userId && (
                                <div>
                                    <ReviewItem
                                        name="photographer"
                                        label="Photographer"
                                        onClick={() =>
                                            handleReviewItemClick(
                                                'photographer'
                                            )
                                        }
                                        selected={!!reviewItems.photographer}
                                    />
                                    <ReviewItem
                                        name="timeIsGold"
                                        label="Time is Gold"
                                        onClick={() =>
                                            handleReviewItemClick('timeIsGold')
                                        }
                                        selected={!!reviewItems.timeIsGold}
                                    />
                                    <ReviewItem
                                        name="kingOfKindness"
                                        label="King of Kindness"
                                        onClick={() =>
                                            handleReviewItemClick(
                                                'kingOfKindness'
                                            )
                                        }
                                        selected={!!reviewItems.kingOfKindness}
                                    />
                                    <ReviewItem
                                        name="professionalGuide"
                                        label="Professional Guide"
                                        onClick={() =>
                                            handleReviewItemClick(
                                                'professionalGuide'
                                            )
                                        }
                                        selected={
                                            !!reviewItems.professionalGuide
                                        }
                                    />
                                    <ReviewItem
                                        name="mannerScore"
                                        label="Manner Score"
                                        onClick={() =>
                                            handleReviewItemClick('mannerScore')
                                        }
                                        selected={!!reviewItems.mannerScore}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </UserList>
                {selectedUser && (
                    <ButtonGroup>
                        <Button onClick={submitReview}>등록</Button>
                    </ButtonGroup>
                )}
            </ModalContent>
        </Modal>
    );
};
const Modal = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 50px;
    max-width: 800px;
    width: 20rem;
    border-radius: 15px;
    border: 2px solid #3498db;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    color: #333;
`;

const UserList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    max-height: 300px;
    overflow-y: auto;
`;

const UserItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
`;

const UserName = styled.span`
    font-size: 16px;
    color: #333;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

const Button = styled.button`
    padding: 8px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: black;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #70b9d6;
        color: white;
    }
`;

const CloseButton = styled.button`
    font-size: 1.5em;
    line-height: 1em;
    width: 1em;
    height: 1em;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #333;
    &:hover {
        color: #ff6b6b;
    }
`;

const ReviewBadge = styled.button<{ selected: boolean }>`
    padding: 10px 20px;
    border-radius: 20px;
    margin: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    background-color: #f0f0f0;
    color: #333;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    ${(props) =>
        props.selected &&
        `
        background-color: #70b9d6;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    `}

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    }
`;
export default Review;
