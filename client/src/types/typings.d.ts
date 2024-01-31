export interface ServerToClientEvents {
  // serverMsg: (data: { msg: string; room: string }) => void;
  error_roomExist: (data: { msg: string }) => void;
  sendRoomLists: (data: { rooms: string[] }) => void;
  notifyEnterRoom: (data: { name: string; room: string }) => void;
}

export interface ClientToServerEvents {
  // clientMsg: (data: { msg: string; room: string }) => void;
  createRoom: (data: { room: string }) => void;
  notifyEnterRoom: (data: { name: string; room: string }) => void;
}
