export interface RequestChat {
  _id: string;
  userId: string;
  message: string;
}

export interface Chat {
  _id?: string;
  userId: string;
  messages: Message[];
}

interface Message {
  message: string;
  responseText: string;
  messageId?: string;
}
