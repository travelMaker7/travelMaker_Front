import React from 'react'
import styled from 'styled-components';

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
