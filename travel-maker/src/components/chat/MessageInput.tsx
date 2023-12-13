import React, {useState} from 'react'
import styled from 'styled-components';
import { Icon } from '@iconify/react';
interface MessageInputProps {
  onSendMessage: (message: string) => void;
  message:string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MessageInput : React.FC<MessageInputProps> = ({onSendMessage, message, setMessage}) => {


  const handleSend = (event) => {
    console.log("클릭")
    event.preventDefault();
    if(message.trim() !== ''){
      console.log('입력값 : ',message)
      onSendMessage(message);
      setMessage('');
      
    }
  }


  return (
    <RowContainer>
      <AttachButton>
        <Icon icon="mdi:plus-circle-outline" height={30} color='grey' />
      </AttachButton>
      <InputContainer>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력해주세요"
        onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
        />
      <SendButton onClick={handleSend} >
        <Icon icon="iconamoon:send-duotone" height={30} color='grey'/>
      </SendButton>
        </InputContainer>
    </RowContainer>
  )
}
export default MessageInput

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
  border: 1px solid #ccc; 
  border-radius: 20px; 
  padding: 5px; 
  margin: 5px;
  `;
  const AttachButton = styled.div`
  display: flex;
  margin-right : 10px;
  margin-left : 10px;
  `
  const InputContainer = styled.div`
  flex-grow: 1; /* Input container takes up remaining space */
  position: relative;

  `
  const Input = styled.input`
  width: 100%; 
  border: none;
  background-color : transparent;
  &:focus {
    outline: none; /* Remove focus outline */
  }
  `;
  
  const SendButton = styled.div`
  display: flex;
  position: absolute; 
  right: 5px; 
  top: 50%; 
  transform: translateY(-50%);
  background-color: transparent; 
  border: none; 
  cursor: pointer;
  &:hover {
  }
`;

