import React, { useState } from 'react'
import { Button } from "@mui/base/Button";
import styled from 'styled-components';
import axios from 'axios';
interface ChatRoomControlProps {
  handleCreateAndEnterRoom: () => void;
}

const ChatRoomButton: React.FC<ChatRoomControlProps> = ({ handleCreateAndEnterRoom }) => {
  
  const handleCreateAndEnterRoom = () => {
    console.log('토큰정보 :', localStorage.getItem("access_token"))
    if(isRoomCreated){
      console.log("chat room is already created")
    }
    // 1:1 채팅방 생성 api 요청 & 입장
    axios
      .post(`https://sosak.store/api/v1/chat/room`,{},
      {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {

        const {chatRoomId, redisRoomId} = response.data.data;
        setChatRoomId(chatRoomId);
        setRedisRoomId(redisRoomId);
        setIsRoomCreated(true);
        console.log('redis : ',redisRoomId)
        console.log('chat : ',chatRoomId)
        const enterRoomUri = `https://sosak.store/api/v1/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`
        return axios.get(enterRoomUri, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }).then(response => {
          console.log("Entered the chat room success", JSON.stringify(response.data.data))
          navigate(`/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`)
        });
      })
      .catch(error => {
        console.log("error creating room ", error);
      });
  }

  return (
    <ChattingButton
    onClick={handleCreateAndEnterRoom}
    >
      1:1 채팅하기
    </ChattingButton>
  )
}

export default ChatRoomButton

const ChattingButton = styled.div``
