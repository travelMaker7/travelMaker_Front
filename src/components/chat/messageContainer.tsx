import React, { useRef , useEffect} from "react";
import styled from 'styled-components';
import {ChatMessage} from './ChatMessage';
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
interface MessageDisplayProps{
  messages: ChatMessage[];
  currentUserId: number;
}

const MessageContainer: React.FC<MessageDisplayProps> = ({ messages, currentUserId }) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  console.log('currentUserId : ',currentUserId)

// 시간 데이터 가공 '오후 10:30' 이런식
const convertToReadableTime = (isoString:string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('ko-KR', {hour:'numeric', minute:'numeric', hour12:true});
}
useEffect(() => {
  messageEndRef.current!.scrollIntoView({behavior : 'smooth'});
})

  return (

    <MessagesContainer>
      {messages.map((msg, index) => {
        if(msg.messageType === 'ENTER' || msg.messageType === 'QUIT'){
          return (
            <SystemMessage key={index}>
              {msg.message}
            </SystemMessage>
          )
        }else if(msg.messageType === 'TALK'){
            const isMyChat = currentUserId === msg.senderId;
            if(isMyChat) {
              return (
                <MyChat
                nickname={msg.nickname}
                message={msg.message}
                createdAt={msg.createdAt}
                convertToReadableTime={convertToReadableTime}
                />
                )
            }
            else{
              return (
                <OpponentChat
                nickname={msg.nickname}
                message={msg.message}
                createdAt={msg.createdAt}
                convertToReadableTime={convertToReadableTime}
                />
              )
            }
        }
      })}
      <div ref = {messageEndRef}></div>
    </MessagesContainer>
  );
};

const MessagesContainer = styled.div`
  padding: 20px;
  height: calc(100vh - 120px); 
  overflow-y: auto;
  background-color: white;
`;
const SystemMessage = styled.div`
  border-radius: 10px;
  background-color:  #ccc; 
  padding:2px;
  margin-bottom:2px;
`

export default MessageContainer