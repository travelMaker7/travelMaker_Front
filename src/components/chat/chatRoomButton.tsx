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

const ChattingButton = styled.div`
  width: 8rem;
  height: 3rem;
  border: none;
  font-weight: bolder;
  background-color: #74B9FF;
  color: white;
  margin: auto;
  border-radius: 1rem;
  text-align: center;
  line-height : 3rem;
  margin-top : 5px;
  cursor : pointer;
`
  
