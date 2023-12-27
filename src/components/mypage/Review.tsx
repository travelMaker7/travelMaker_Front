import styled from 'styled-components';

interface User {
    userId: number;
    username: string;
    imageUrl: string;
}

interface Props {
    users: User[];

    onClose: () => void;
}

const Review: React.FC<Props> = ({ users, onClose }) => {
    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>리뷰</ModalTitle>
                </ModalHeader>
                <UserList>
                    {users.map((user) => (
                        <UserItem key={user.userId}>
                            <UserImage
                                src={user.imageUrl}
                                alt={user.username}
                            />
                            <UserName>{user.username}</UserName>
                        </UserItem>
                    ))}
                </UserList>
                <ButtonGroup>
                    <Button onClick={onClose}>확인</Button>
                    <Button onClick={onClose}>취소</Button>
                </ButtonGroup>
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
    width: 15rem;
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
export default Review;
