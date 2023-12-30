import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ParticipatingSchedule, RegisteredSchedule } from '@/utils/Types';
import MyPageScheduleDelete from './MyPageScheduleDelete';
import NotificationsList from './NotificationsList';
import { Link } from 'react-router-dom';
import KakaoStaticMap from './KakaoStaticMap';
import Review from './Review';

export interface ButtonProps {
    isActive: boolean;
}

const MyPageSidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('registered');

    const [registeredSchedules, setRegisteredSchedules] = useState<
        RegisteredSchedule[]
    >([]);
    const [participatingSchedules, setParticipatingSchedules] = useState<
        ParticipatingSchedule[]
    >([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const handleMouseEnter = () => setShowDeleteButton(true);
    const handleMouseLeave = () => setShowDeleteButton(false);

    const [selectTripPlanId, setSelectedTripPlanId] = useState<string | null>(
        null
    );

    const [joinUsers, setJoinUsers] = useState([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const getRegisteredSchedules = async () => {
        try {
            const response = await axios.get(
                'https://sosak.store/api/v1/mypage/schedules/registered',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            );
            console.log(
                'response.data.data.schedules : ',
                response.data.data.schedules
            );
            if (response.status === 200) {
                setRegisteredSchedules(response.data.data.schedules);
                console.log(
                    'response.data.data.schedules : ',
                    response.data.data.schedules
                );
                console.log('등록한 일정 조회 성공');
            } else {
                console.log('등록한 일정 조회 실패');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getParticipatingSchedules = async (status: string) => {
        try {
            const response = await axios.get(
                `https://sosak.store/api/v1/mypage/schedules/participating?status=${status}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            );
            if (response.status === 200) {
                setParticipatingSchedules(response.data.data.schedules);
                console.log('참여 일정 조회 성공');
                console.log(
                    'response.data.data.schedules : ',
                    response.data.data.schedules
                );
            } else {
                console.log('참여 일정 조회 실패');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSchedule = async (tripPlanId: string) => {
        try {
            const response = await axios.delete(
                `https://sosak.store/api/v1/accompany/guest/${tripPlanId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            );

            if (response.status === 201) {
                console.log('일정 삭제 성공');
            } else {
                console.log('일정 삭제 실패');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab === 'registered') {
            console.log('등록한 일정 조회');
            getRegisteredSchedules();
        } else if (activeTab !== 'notifications') {
            getParticipatingSchedules(activeTab);
        }
    }, [activeTab]);

    const handleDeleteClick = (tripPlanId: string) => {
        setSelectedTripPlanId(tripPlanId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectTripPlanId) {
            await deleteSchedule(selectTripPlanId);
            setShowDeleteModal(false);
        }
    };

    const handleReviewClick = async (
        scheduleId: string,
        tripPlanId: string
    ) => {
        try {
            const response = await axios.get(
                `https://sosak.store/api/v1/mypage/schedules/${scheduleId}?tripPlanId=${tripPlanId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            );

            if (response.status === 200) {
                setJoinUsers(response.data.data.joinUsers);
                console.log('참여자 조회 성공', response.data.data.joinUsers);
                setIsReviewModalOpen(true);
            } else {
                console.log('참여자 조회 실패'), response.data.data.joinUsers;
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <PageContainer>
            <Sidebar>
                <SidebarItem
                    onClick={() => setActiveTab('registered')}
                    isActive={activeTab === 'registered'}
                >
                    등록한 일정
                </SidebarItem>
                <SidebarItem
                    onClick={() => setActiveTab('승인대기')}
                    isActive={activeTab === '승인대기'}
                >
                    참여 대기중
                </SidebarItem>
                <SidebarItem
                    onClick={() => setActiveTab('신청수락')}
                    isActive={activeTab === '신청수락'}
                >
                    참여 예정
                </SidebarItem>
                <SidebarItem
                    onClick={() => setActiveTab('동행완료')}
                    isActive={activeTab === '동행완료'}
                >
                    참여 완료
                </SidebarItem>
                <SidebarItem
                    onClick={() => setActiveTab('notifications')}
                    isActive={activeTab === 'notifications'}
                >
                    알림
                </SidebarItem>
            </Sidebar>
            <ContentArea>
                {activeTab === 'registered' &&
                    registeredSchedules.map((schedule) => (
                        <ScheduleCard key={schedule.scheduleId}>
                            <ImageContainer>
                                <LinkItem
                                    to={`/detailmap/${schedule.scheduleId}`}
                                >
                                    {schedule.markers &&
                                        schedule.markers.length > 0 && (
                                            <KakaoStaticMap
                                                markers={schedule.markers}
                                                width="100%"
                                                height="300px"
                                            />
                                        )}
                                </LinkItem>
                            </ImageContainer>

                            <TextContent>
                                <StyledH3>{schedule.scheduleName}</StyledH3>
                                <StyledP>
                                    {schedule.scheduleDescription}
                                </StyledP>
                            </TextContent>
                        </ScheduleCard>
                    ))}
                {activeTab === '승인대기' &&
                    participatingSchedules.map((schedule) => (
                        <ScheduleCard key={schedule.scheduleId}>
                            <ImageContainer>
                                <LinkItem
                                    to={`/detailmap/${schedule.scheduleId}`}
                                >
                                    <KakaoStaticMap
                                        markers={[
                                            {
                                                destinationY:
                                                    schedule.destinationY,
                                                destinationX:
                                                    schedule.destinationX,
                                            },
                                        ]}
                                        width="100%"
                                        height="300px"
                                    />
                                </LinkItem>
                            </ImageContainer>

                            <TextContent>
                                <StyledH3>{schedule.scheduleName}</StyledH3>
                                <StyledP>
                                    여행지: {schedule.destinationName}
                                </StyledP>
                                <StyledP>
                                    일정 날짜: {schedule.scheduleDate}
                                </StyledP>
                            </TextContent>
                        </ScheduleCard>
                    ))}

                {activeTab === '신청수락' &&
                    participatingSchedules.map((schedule) => (
                        <ScheduleCard
                            key={schedule.scheduleId}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <ImageContainer>
                                <LinkItem
                                    to={`/detailmap/${schedule.scheduleId}`}
                                >
                                    <KakaoStaticMap
                                        markers={[
                                            {
                                                destinationY:
                                                    schedule.destinationY,
                                                destinationX:
                                                    schedule.destinationX,
                                            },
                                        ]}
                                        width="100%"
                                        height="300px"
                                    />
                                </LinkItem>
                            </ImageContainer>

                            <TextContent>
                                <StyledH3>{schedule.scheduleName}</StyledH3>
                                <StyledP>
                                    여행지: {schedule.destinationName}
                                </StyledP>
                                <StyledP>
                                    일정 날짜: {schedule.scheduleDate}
                                </StyledP>
                            </TextContent>
                            {showDeleteButton && (
                                <DeleteButton
                                    onClick={() =>
                                        handleDeleteClick(schedule.tripPlanId)
                                    }
                                >
                                    X
                                </DeleteButton>
                            )}
                        </ScheduleCard>
                    ))}

                {activeTab === '동행완료' &&
                    participatingSchedules.map((schedule) => (
                        <ScheduleCard key={schedule.scheduleId}>
                            <ImageContainer>
                                <LinkItem
                                    to={`/detailmap/${schedule.scheduleId}`}
                                >
                                    <KakaoStaticMap
                                        markers={[
                                            {
                                                destinationY:
                                                    schedule.destinationY,
                                                destinationX:
                                                    schedule.destinationX,
                                            },
                                        ]}
                                        width="100%"
                                        height="300px"
                                    />
                                </LinkItem>
                            </ImageContainer>
                            <TextContent>
                                <StyledH3>{schedule.scheduleName}</StyledH3>
                                <StyledP>
                                    {schedule.scheduleDate} :{' '}
                                    {schedule.destinationName}
                                </StyledP>
                            </TextContent>
                            <ReviewButton
                                onClick={() =>
                                    handleReviewClick(
                                        schedule.scheduleId,
                                        schedule.tripPlanId
                                    )
                                }
                            >
                                리뷰하기
                            </ReviewButton>
                            {isReviewModalOpen && (
                                <Review
                                    tripPlanId={schedule.tripPlanId}
                                    users={joinUsers}
                                    onClose={() => setIsReviewModalOpen(false)}
                                />
                            )}
                        </ScheduleCard>
                    ))}
                {activeTab === 'notifications' && <NotificationsList />}
                {showDeleteModal && (
                    <MyPageScheduleDelete
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </ContentArea>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    padding: 40px;
    /* margin-top: 60px; */
    /* background-color: #ecf0f1; */
`;

const Sidebar = styled.div`
    width: 200px;
    /* background-color: #34495e; */
    padding: 0 15px;
    /* box-shadow: 3px 0 10px rgba(0, 0, 0, 0.3); */
    color: #ecf0f1;
    margin-right: 10px;
    border-right: 2px solid #ddd;
`;

const SidebarItem = styled.div<ButtonProps>`
    padding: 8px 12px;
    margin-bottom: 5px;
    background-color: ${(props) =>
        props.isActive ? '#2c3e50' : 'transparent'};
    color: ${(props) => (props.isActive ? '#fff' : '#000000')};
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s;

    &:hover {
        background-color: #2c3e50;
        color: #fff;
    }
`;

const ContentArea = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    text-align: center;
    justify-content: flex-start;
    /* margin-top: 10px; */
    gap: 20px;
    padding: 0 10px;
    width: 100%;
`;

const ScheduleCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    width: 20rem;
    height: 25rem;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 8px;
    z-index: 1;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
const StyledH3 = styled.h3`
    font-size: 16px;
    color: #333;
    margin: 5px;
    font-weight: 500;
    text-align: center;
`;

const StyledP = styled.p`
    font-size: 16px; // Adjusted to match ModalText
    color: #333; // Standard text color
    margin: 0 0 5px 0;
    text-align: center; // Center align if needed
`;

const TextContent = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0 5px;
    height: 120px;
    text-align: center;
`;

const ReviewButton = styled.button`
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    padding: 10px 20px;
    border: 1px solid #006fe6;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
    transition:
        background-color 0.3s ease,
        transform 0.3s ease;

    &:hover {
        background-color: #006fe6;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        background-color: #0056b3;
        transform: translateY(1px);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #006fe6;
    }

    @media (max-width: 1024px) {
        width: auto;
    }
`;
const DeleteButton = styled.button`
    position: absolute;
    background-color: transparent;
    top: 12px;
    right: 12px;
    z-index: 100;
    color: #34495e;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`;

const LinkItem = styled(Link)`
    text-decoration: none;
    color: #000;
    cursor: pointer;
`;
export default MyPageSidebar;
