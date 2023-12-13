import styled from 'styled-components';
interface Props {
  nickname: string;
  message: string;
  createdAt: string;
  convertToReadableTime: (isoString:string) => string;

}
const MyChat = ({nickname, message, createdAt, convertToReadableTime}: Props) => {

  
  return (
    <MyMessageContainer>
      <MessageBubble>
        <Nickname>{nickname}</Nickname>
        <MessageWrapper>
          <TimeStamp>{convertToReadableTime(createdAt)}</TimeStamp>
          <Text>{message}</Text>
        </MessageWrapper>
      </MessageBubble>
    </MyMessageContainer>
  )
}

export default MyChat

const MyMessageContainer = styled.div`
`
const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  justify-content: flex-end;
  `
  const TimeStamp = styled.div`
  align-self: flex-end;
  font-size: 0.75em;
  margin-right:10px;
  flex-shrink: 0; // 0으로 세팅하면 고정폭의 컬럼을 만들 수 있음
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
    // border: 1px solid black;
    position: absolute;
    right : -4px;
    top: 50%;
    background-color: #BBDEFB;
    transform: rotate( 45deg );
    z-index:-1;
  }
`