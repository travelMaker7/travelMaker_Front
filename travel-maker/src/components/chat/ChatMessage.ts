export interface ChatMessage {
    messageType: string,
    redisRoomId: string,
    chatRoomId: number,
    senderId: number,
    nickname: string,
    message: string,
    createdAt: string
    
  }
  