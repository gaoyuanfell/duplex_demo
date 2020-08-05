export enum MessageType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  CALL = "CALL",
  OFFER = "OFFER",
  ANSWER = "ANSWER",
  CREATE_ROOM = "CREATE_ROOM",
  CREATE_ROOM_STATE = "CREATE_ROOM_STATE",
  JOIN_ROOM = "JOIN_ROOM",
  OUT_ROOM = "OUT_ROOM",
  PING = "PING",
}

export * from "./ws-client";
export * from "./duplex";
