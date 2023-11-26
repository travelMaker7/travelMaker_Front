import React, { useState } from 'react'
import { Button } from "@mui/base/Button";
import styled from 'styled-components';
import axios from 'axios';
interface ChatRoomControlProps {
  handleCreateAndEnterRoom: () => void;
}

const ChatRoomButton: React.FC<ChatRoomControlProps> = ({handleCreateAndEnterRoom }) => {
  
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
