import ws from "ws";
import { userManager } from "./user";

class Room {
  constructor(roomId: string, fans: ws[] = []) {
    this.fans = fans;
    this.roomId = roomId;
  }
  fans: ws[] = [];
  roomId?: string;
  sdp?: string;

  push(client: ws) {
    this.fans.push(client);
  }

  get fansList() {
    return this.fans.map((client) => userManager.getAddress(client));
  }
}

class RoomManager {
  roomMap = new WeakMap<ws, Room>();
  roomIdMap = new Map<string, ws>();

  creat(client: ws, roomId: string) {
    if (this.roomMap.has(client)) return;
    this.roomIdMap.set(roomId, client);
    let room = new Room(roomId);
    this.roomMap.set(client, room);
  }

  private getAnchor(roomId: string): ws | undefined {
    return this.roomIdMap.get(roomId);
  }

  getAnchorRoom(roomId: string) {
    let anchor = this.getAnchor(roomId);
    if (!anchor) return;
    return this.roomMap.get(anchor);
  }

  join(client: ws, roomId: string) {
    let room = this.getAnchorRoom(roomId);
    room?.push(client);
  }
}

export const roomManager = new RoomManager();
