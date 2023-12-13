import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
type ChatType = 'group' | 'direct';
interface ChatButtonProps {
    isActive: boolean;
}
interface ChatRoom{
    roomName: string;
		chatRoomId: number;
		redisRoomId: string;
    participants : number;
    recentTalk: string;
    recentTalkDate: string;
}

const ChatRooms = () => {
		const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatType, setChatType] = useState<ChatType>('group')


		// 그룹 채팅 일경우 or 1:1 채팅 일경우 구분
    const filteredChatRooms = () : ChatRoom[] => {
        return chatRooms.filter(room => chatType === 'group' ? room.participants > 2 : room.participants === 2);
    }
		// 시간 데이터 가공 '오후 10:30' 이런식
		const convertToReadableTime = (isoString:string): string => {
			const date = new Date(isoString);
			return date.toLocaleTimeString('ko-KR', {hour:'numeric', minute:'numeric', hour12:true});
		}

		// 해당 채팅방 입장
		const enterChatRoom = (redisRoomId:string, chatRoomId:number)=> {
			console.log(`redisRoomId : ${redisRoomId}, chatRoomId: ${chatRoomId}`);
			navigate(`/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`)
		}
		useEffect(() =>{
			const getChatRooms = async () => {
				try{
					const response = await axios.get(`https://sosak.store/api/v1/chat/rooms`,
					// const response = await axios.get(`http://localhost:8080/api/v1/chat/rooms`,
					{
						headers: {
							"Authorization" : `Bearer ${localStorage.getItem("access_token")}`
						}
					});
					console.log('response : ', response.data.data.chatRooms)
					setChatRooms(response.data.data.chatRooms);
				}catch (error){
					console.error('Error 채팅 목록 가져오기 실패', error)
				}
			};
			getChatRooms();
		}, []);


  return (
    <ChatContainer>
    <ChatHeader>
      <ChatButton onClick={() => setChatType('group')} isActive={chatType === 'group'} >그룹 채팅</ChatButton>
      <ChatButton onClick={() => setChatType('direct')} isActive={chatType === 'direct'} >1:1 채팅</ChatButton>
    </ChatHeader>
    <ChatList>
      {filteredChatRooms().map((room, index) => (
        <ChatListItem key={index}>
        <IconWrapper>
          <Icon icon="iconoir:people-tag" height="2rem" />
        </IconWrapper>
          <ChatInfo onClick={() => enterChatRoom(room.redisRoomId, room.chatRoomId)}>
            <RoomNameAndParticipants>
                <RoomName>{room.roomName}</RoomName>
                <Participants>{room.participants}</Participants>
            </RoomNameAndParticipants>
            <RoomRecentTalk>{room.recentTalk}</RoomRecentTalk>
          </ChatInfo>
          <ChatTime>{convertToReadableTime(room.recentTalkDate)}</ChatTime>
        </ChatListItem>
      ))}
    </ChatList>
  </ChatContainer>
);
}

export default ChatRooms
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
// 그룹채팅 or 1:1채팅 버튼
const ChatHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
`;

const ChatButton = styled.button<ChatButtonProps>`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  background-color: ${props => props.isActive ? 'darkgray' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
  border: 1px solid grey;
  border-radius : 10px;
  &:hover {
    background-color: ${props => props.isActive ? 'darkgray' : 'lightgray'};
  }
`;
// 채팅 목록
const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatListItem = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px;
//   align-items: center;
`;
// 아이콘
const IconWrapper = styled.div`
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center; 
`;
// 채팅 정보 (채팅방이름, 참여자수, 최근채팅 내용)
const ChatInfo = styled.div`
  display: flex;
  flex:2;
  flex-direction: column;
  justify-content: start;
  // align-items: center;
  `;
  const RoomNameAndParticipants = styled.div`
  display: flex;
  `
  const RoomName = styled.div`
  
  `;
  
  const Participants = styled.div`
  padding-left: 10px;
  color: grey;
  `;
  const RoomRecentTalk = styled.div`
  color: grey;
  font-size: 15px;
  justify-content: start;
  display: flex;
  `
// 최근 대화 시간
  const ChatTime = styled.span`
  flex:1;
  font-size:10px;
`;