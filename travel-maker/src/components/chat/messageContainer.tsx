import React, { useState } from "react";
import { Container } from "@mui/system";
import styled from 'styled-components';



const MessageContainer = ({ messageList, currentUser }) => {


  const formatTime = (date) => {
    let timeString = new Date(date).toLocaleDateString([], {hour:'2-digit', minute:'2-digit', hour12:false})
    timeString = timeString.replace(/ ?(AM|PM)$/i, '');
    return timeString;
  }

  return (
    <MessageContainerGroup>
      {messageList.map((message, index) => (
        <Message 
          key={index} 
          isSender={message.senderId === currentUser}
        >
          <MessageBody>
            {message.nickname} - {message.message}
            </MessageBody>
            <MessageHeader>
            {formatTime(message.createdAt)}
          </MessageHeader>
        </Message>
      ))}
    </MessageContainerGroup>
  );
};
const MessageContainerGroup = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  max-width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  align-self: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.isSender ? '#d1d3d4' : '#e5e5ea')};

  &::after {
    content: '';
    position: absolute;
    ${(props) => (props.isSender ? 'right' : 'left')}: 10px; // Position the tail on the bottom corner of the message
    bottom: -10px; // Adjust this value as needed
    border: 10px solid transparent;
    border-top-color: ${(props) => (props.isSender ? '#d1d3d4' : '#e5e5ea')}; // Color of the bubble
    margin-top: 0;
    margin-${(props) => (props.isSender ? 'right' : 'left')}: -10px; // Adjust this to align the tail with the corner of the message bubble
    transform: ${(props) => (props.isSender ? 'rotate(45deg)' : 'rotate(-135deg)')}; // Rotate the tail to point outwards
  }
`;

const MessageHeader = styled.div`
  // margin-bottom: 5px;
`;

const MessageBody = styled.div`
  // background-color: #f7e600;
  // border-radius: 8px;
  // padding: 8px;
  // max-width: 200px;
  // font-size: 12px;
`;
// const SystemMessageContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SystemMessage = styled.div`
//   background-color: #55667758;
//   border-radius: 100px;
//   text-align: center;
//   color: white;
//   padding: 2px 15px;
//   font-size: 14px;
// `;

// const MyMessageContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 5px;
// `;

// const MyMessage = styled.div`
//   background-color: #f7e600;
//   border-radius: 8px;
//   padding: 8px;
//   max-width: 200px;
//   font-size: 12px;
// `;

// const YourMessageContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const YourMessage = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 8px;
//   max-width: 200px;
//   font-size: 12px;
// `;

// const ProfileImage = styled.img`
//   width: 38px;
//   height: 38px;
//   border-radius: 100px;
//   margin-right: 10px;
// `;

export default MessageContainer
