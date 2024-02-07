export interface ServerToClientEvents {
  serverMsg: (msg: string) => void;
  welcome: (message: Message) => void;
}

export interface ClientToServerEvents {
  clientMsg: (msg: string) => void;
  welcome: (message: Message) => void;
}

export interface Message {
  type: string;
  user: string;
  message: string;
  room: string;
}