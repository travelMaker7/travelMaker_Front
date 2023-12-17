import React, {useState, useRef, useEffect} from 'react'
import {Client} from '@stomp/stompjs'
import styled from 'styled-components';
import axios from 'axios';
import { Icon } from '@iconify/react';
// import { useNavigate } from "react-router"; // 임시
import { useParams, useLocation } from 'react-router-dom';
import MessageContainer from '@/components/chat/messageContainer';
import MessageInput from '../../components/chat/MessageInput';
import { ChatMessage } from '@/components/chat/ChatMessage';

// 채팅방에 들어왔을 떄!
// 채팅내역 api전송

const Chat:React.FC = () => {
  const token = localStorage.getItem('access_token');
  const {redisRoomId} = useParams();
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  }
    // const navigate = useNavigate(); // 임시
  const chatRoomId = useQuery().get('chatRoomId'); 
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const client = useRef<Client|undefined>()
  const senderId = localStorage.getItem('user_id'); // 로컬스토리지에서 가져다 사용

  useEffect(() => {
    console.log("채팅창 입장")
    initChat();
    return () => disConnect();
  }, []);

  const initChat = async () => {
    console.log("init 시작")
    // 과거 채팅 내역 불러오기
    await getChatMessages();
    // client create
    createClient()
    // connect 
    connect()
    // 메시지들, 방이름
  }

  // 연결해제
  const disConnect = () => {
    client.current && client.current.deactivate();
  }

  // 클라이언트 생성
  const createClient = () => {
    const newClient = new Client({
      // brokerURL: 'ws://localhost:8080/ws-stomp', // 웹소켓 서버로 직접 접속
      brokerURL: 'wss://sosak.store/ws-stomp', // 웹소켓 서버로 직접 접속
      connectHeaders:{Authorization : `Bearer ${token}`}
    });
    client.current = newClient;
    return newClient;
  }
  // 연결
  const connect = () => {
    client.current!.onConnect = (frame) => {
      console.log('연결! ', frame)
      client.current?.subscribe(
        `/sub/chat/room/${redisRoomId}`,
        (res) => {
          console.log('구독 후 응답 : ',res.body)
          const recv = JSON.parse(res.body);
          displayMessage(recv);
        },
        {"Authorization" : `Bearer ${token}`}
      );
    };
    client.current!.onStompError = (frame) => {
      if(frame.headers['message'] === 'error'){
        // requestNewAccessToken();
        const newClient = createClient();
        client.current = newClient;
        connect();
        setTimeout(()=>{
          console.log("재전송");
        }, 200);
      }
    }
    client.current?.activate();
  }
  // 메시지 표시 함수
  const displayMessage = (msg:any) => {
    // 메시지 화면에 표시
    setMessages(prevMessages => [...prevMessages, msg]) // ChatMessage개체가 포함이 되어야함
  }

  //채팅 보내기
  const requestChatSubmit = () => {
    console.log('버튼 클릭')
    if(client.current && client.current.connected){
      client.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({
          messageType:"TALK",
          redisRoomId: redisRoomId,
          chatRoomId: chatRoomId,
          message: message
        }),
        headers:{"Authorization" : `Bearer ${token}`},
      });
    }
  };

  // 채팅내역 가져오기
  const getChatMessages = async () => {
    console.log('채팅내역 가져오기 시작!')
    try{
      const response = await axios.get(`https://sosak.store/api/v1/chat/room/${redisRoomId}/messages?chatRoomId=${chatRoomId}`,
      // const response = await axios.get(`http://localhost:8080/api/v1/chat/room/${redisRoomId}/messages?chatRoomId=${chatRoomId}`,
      // const response = await axios.get(`/api/v1/chat/room/97b561cf-2e00-45cd-a62a-6a506c883273/messages?chatRoomId=22&page=1&size=50`,
      {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log("이전 채팅내역 가져오기 : ", response.data.data.messages)
      setMessages(response.data.data.messages)
    } catch(error){
      console.log('채팅 내역 가져오기 오류 ', error);
    }
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <GoBackIcon>
          {/* <Icon icon="lets-icons:sign-out-squre-light" height={25} /> */}
          <Icon icon="lucide:arrow-left-to-line" height={25} color="#666"/>
        </GoBackIcon>
        <ChatSearchAndMenuWrapper>
          <ChatSearch>
            {/* <Icon icon="gala:search" height={25} rotate={3}/> */}
            {/* <Icon icon="fluent:search-20-filled" height={25} color="#666"/> */}
            <Icon icon="lucide:search" height={25}color="#666" />
          </ChatSearch>
          <Menu>
            {/* <Icon icon="heroicons-outline:menu-alt-2" height={25}color="#666" /> */}
            <Icon icon="lucide:menu" height={25}color="#666"/>
          </Menu>
        </ChatSearchAndMenuWrapper>
      </ChatHeader>
        <MessageContainer messages={messages} currentUserId={Number(senderId)} />
        <MessageInput onSendMessage={requestChatSubmit} message={message} setMessage={setMessage}/>
    </ChatContainer>
  )
}
export default Chat

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  `;
  const GoBackIcon = styled.div`
  // border: 1px solid black;
  `
  const ChatSearchAndMenuWrapper = styled.div`
  // border: 1px solid black;
  display: flex;
  `
  const ChatSearch = styled.div`
  margin-right : 5px;
`
const Menu = styled.div`
`




// access_token재발급
    // const requestNewAccessToken = () => {
    //   axios.post(`/api/v1/reissue`,
    //   {
    //     "refreshToken" : `${localStorage.getItem("refresh_token")}`
    //   }
    //   )
    //   .then((response) => {
    //     const newToken = response.data.data.accessToken;
    //     console.log('재생성 결과 : ', newToken)
    //     localStorage.setItem("access_token", newToken)
    //   })
    //   .catch((error) => {
    //     localStorage.removeItem("access_token");
    //     navigate("/login");
    //   })
    // }