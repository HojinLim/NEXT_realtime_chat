export interface ServerToClientEvents {
  // serverMsg: (msg: Message) => void;
  // welcome: (message: Message) => void;

  newMessage: (message: any) => void;

}

export interface ClientToServerEvents {
  // clientMsg: (msg: Message) => void;
  // welcome: (message: Message) => void;
}

export interface Message {
  senderId: any;
  receiverId: string;
  message: any;
}

