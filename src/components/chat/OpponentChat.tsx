import styled from 'styled-components';
import { Icon } from '@iconify/react';
interface Props {
    nickname: string;
    message: string;
    createdAt: string;
    convertToReadableTime: (isoString:string) => string;
  
  }
const OpponentChat = ({nickname, message, createdAt, convertToReadableTime}: Props) => {
  
  return (
    <OpponentMessageContainer>
      <MessageBubble>
        <Nickname>{nickname}</Nickname>
        <MessageWrapper>
          <IconWrapper>
            <Icon icon="teenyicons:user-circle-outline" height={30} style={{}}/>
          </IconWrapper>
          <Text>{message}</Text>
          <TimeStamp>{convertToReadableTime(createdAt)}</TimeStamp>
        </MessageWrapper>
      </MessageBubble>
    </OpponentMessageContainer>
  )
}

export default OpponentChat
const OpponentMessageContainer = styled.div`
`
const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  word-wrap: break-word;
  margin: 10px;
  border-radius: 20px;
`
const Nickname = styled.div`
  font-weight: bold;
`
const MessageWrapper = styled.div`
  display:flex;
  width: 50%;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
const TimeStamp = styled.div`
  align-self: flex-end;
  font-size: 0.75em;
  margin-left: 10px;
  flex-shrink: 0;
`
const Text = styled.div`
  margin-top: 5px;
  background-color: #BBDEFB;
  padding : 10px;
  border-radius: 10px;
  position: relative;
  z-index:0;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    left : -4px;
    top: 50%;
    background-color: #BBDEFB;
    transform: rotate( 45deg );
    z-index:-1;
  }
`