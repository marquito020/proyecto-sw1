export interface ChatInfo {
  _id?: string;
  message: string;
  userId: string;
}

export interface Message {
  _id?: string;
  message: string;
  messageId?: string;
  responseText: string;
}

export interface UserChats {
  _id?: string;
  userId: string;
  messages: Message[];
}
