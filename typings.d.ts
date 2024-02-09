export interface ServerToClientEvents {
  serverMsg: (msg: Message) => void;
  welcome: (message: Message) => void;
}

export interface ClientToServerEvents {
  clientMsg: (msg: Message) => void;
  welcome: (message: Message) => void;
}

export interface Message {
  // type: string;
  user: string;
  message: string;
  room: string?;
}