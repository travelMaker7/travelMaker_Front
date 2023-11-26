import React, { useState } from 'react'
import axios from 'axios';
import { Button } from "@mui/base/Button";
import { useNavigate } from "react-router";

const ChatRoomButton = () => {
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [redisRoomId, setRedisRoomId] = useState();
  const [chatRoomId, setChatRoomId] = useState();
  const navigate = useNavigate();
  
  const handleCreateAndEnterRoom = () => {
    console.log('토큰정보 :', localStorage.getItem("access_token"))
    if(isRoomCreated){
      console.log("chat room is already created")
    }
    // 1:1 채팅방 생성 api 요청 & 입장
    axios
      .post(`/api/v1/chat/room`,{},
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
        const enterRoomUri = `/api/v1/chat/room/${redisRoomId}?chatRoomId=${chatRoomId}`
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
    <div>
      <Button
      type='button'
      style={{
        borderRadius: '20px', 
        backgroundColor: '#83d2ef', 
        padding: '10px',
        border: 'none'
      }}
      onClick={() => {handleCreateAndEnterRoom()}}
      >
        1:1 채팅하기
      </Button>
    </div>
  )
}

export default ChatRoomButton
