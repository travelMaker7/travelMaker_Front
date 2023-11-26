import React from 'react'

import { Button } from "@mui/base/Button";
import styled from 'styled-components';
import MessageContainer from "../../components/chat/messageContainer";

const InputField = ({message,setMessage,requestChatSubmit, messages, currentUser}) => {
  console.log('입력된 글 : ', event?.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    requestChatSubmit(message);
    setMessage();
  }
  const handleSendClick = (event) =>{
    requestChatSubmit(event);
    setMessage("");
  }

  return (
    <Container>
      <MessageContainer
        messageList={messages}
        currentUser={currentUser}
      />
    <InputForm onSubmit={handleFormSubmit}>
      <Input
        placeholder="Type in here…"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button
        disabled={message === ""}
        type="submit"
        className="send-button"
        onClick={handleSendClick}
      >
        전송
      </Button>
    </InputForm>
  </Container>
  )
}
export default InputField

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  justify-content: flex-end; 
  height: 100vh;
  box-sizing: border-box; 
`;
const InputForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px; // 최대 너비 설정
  border: 1px solid #ccc; // 테두리 설정
  padding: 10px;
  border-radius: 10px; // 모서리 둥글게
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  color: B3E5FC
`;

