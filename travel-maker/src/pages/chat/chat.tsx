import React, {useState, useRef, useEffect} from 'react'
import {Client, CompatClient, IMessage, Stomp} from '@stomp/stompjs'
import InputField from "../../components/chat/inputField";
import SockJs from 'sockjs-client';
import axios from 'axios';
import { useNavigate } from "react-router";
import { useParams, useLocation } from 'react-router-dom';



export type ChatMessage = {
  messageType: "TALK" | "ENTER",
  redisRoomId: String,
  chatRoomId: number,
  senderId: number,
  senderNickname: String,
  message: String,
  createdAt: Date
}

// 채팅방에 들어왔을 떄!
// 채팅내역 api전송
// 


const Chat:React.FC = () => {
  const token = localStorage.getItem('access_token');
  const {redisRoomId} = useParams();
  console.log('redisRoomId : ',redisRoomId)
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  }
  const navigate = useNavigate();
  const chatRoomIdQuery = useQuery().get('chatRoomId');
  console.log('chatRoomId', chatRoomIdQuery)
  const [chatRoomId, setChatRoomId] = useState(chatRoomIdQuery);
  const [message, setMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState();
  const client = useRef<Client|undefined>()
  const [nickname, setNickname] = useState();
  const [senderId, setSenderId] = useState();
  console.log("sender id : ", senderId)
  useEffect(() => {
    initChat();
    return () => disConnect();
  }, []);

  const initChat = async () => {
    // client create
    createClient()
    // connect 
    connect()
    // 과거 채팅 내역 불러오기 나중에해!
    // await getChatMessages();
    // 메시지들, 방이름
  }

  // 연결해제
  const disConnect = () => {
    client.current && client.current.deactivate();
  }

  // 클라이언트 생성
  const createClient = () => {
    const newClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-stomp', // 웹소켓 서버로 직접 접속
      // brokerURL: 'wss://sosak.store/ws-stomp', // 웹소켓 서버로 직접 접속
      connectHeaders:{Authorization : `Bearer ${token}`}
    });
    client.current = newClient;
    return newClient;
  }
  // 연결
  const connect = () => {
    client.current!.onConnect = (frame) => {
      client.current?.subscribe(
        `/sub/chat/room/${redisRoomId}`,
        // `https://sosak.store/sub/chat/room/${redisRoomId}`,
        (res) => {
          console.log('구독 후 응답 : ',res.body)
          const recv = JSON.parse(res.body);
          setNickname(recv.nickname)
          setSenderId(recv.senderId)
          displayMessage(recv);
        },
        {"Authorization" : `Bearer ${token}`}
      );
      // publishEnter()
    };
    client.current!.onStompError = (frame) => {
      if(frame.headers['message'] === 'error'){
        requestNewAccessToken();
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
  const displayMessage = (msg) => {
    // 메시지 화면에 표시
    console.log('화면에 표시 해야함')
    setMessages(prevMessages => [...prevMessages, msg]) // ChatMessage개체가 포함이 되어야함
  }

  // access_token재발급
  const requestNewAccessToken = () => {
    axios.post(`/api/v1/reissue`,
    {
      "refreshToken" : `${localStorage.getItem("refresh_token")}`
    }
    )
    .then((response) => {
      const newToken = response.data.data.accessToken;
      console.log('재생성 결과 : ', newToken)
      localStorage.setItem("access_token", newToken)
    })
    .catch((error) => {
      localStorage.removeItem("access_token");
      navigate("/login");
    })
  }

  // 메시지 발신 - 처음 입장시
  const publishEnter = () => {
    if(client.current){ 
        client.current.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            messageType: "ENTER",
            redisRoomId: redisRoomId,
            chatRoomId: chatRoomId,
            senderId: senderId,
            message: message,
            nickname: nickname,
          }
          )
      });
    }
  }

  //채팅 보내기
  const requestChatSubmit = () => {
    console.log('버튼 클릭')
    if(client.current && client.current.connected){
      client.current.publish({
        destination: "/pub/chat/message",
        // destination: "https://sosak.store/pub/chat/message",
        body: JSON.stringify({
          messageType:"TALK",
          redisRoomId: redisRoomId,
          chatRoomId: chatRoomId,
          // senderId: senderId,
          // nickname: nickname,
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
      // const response = await axios.get(`/api/v1/chat/room/97b561cf-2e00-45cd-a62a-6a506c883273/messages?chatRoomId=22&page=1&size=50`,
      {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log("왜 안와????")
        setMessages(response.data.data)
    } catch(error){
      console.log('채팅 내역 가져오기 오류 ', error);
    }
  }



  return (
    <div>
      <InputField 
      message={message} 
      setMessage={setMessage} 
      requestChatSubmit={requestChatSubmit}
      messages={messages}
      currentUser={senderId}
      />
    </div>
  )
}
export default Chat

 // 채팅방 구독 
//  const subscribeToChatRoom = () =>{
//   if(client.current){ // client.current 가 null이 아닌지 확인
//     client.current?.subscribe(
//       `/sub/chat/room/${redisRoomId}`,
//       (res) => {
//         console.log(res.body)
//         const recv = JSON.parse(res.body);
//         displayMessage(recv);
//       },
//       {"Authorization" : `Bearer ${token}`}
//     );
//     console.log("구독 완료!")
//     publishEnter()
//   }else{
//     console.error('WebSocket client is not connected');
//   }
// }
