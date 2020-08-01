import { UserManager } from "./user";
import { MessageType } from "ws-core";
import ws, { Server as WsServer } from "ws";
import express from "express";
import http, { Server } from "http";

// import fs from "fs";
// import path from "path";
// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, "../listen/privatekey.pem")),
//   cert: fs.readFileSync(path.resolve(__dirname, "../listencertificate.pem")),
// };

const userManager = new UserManager();

export class WsServerHelper {
  private server: Server;
  private wss?: WsServer;
  constructor(port: number = 8081) {
    let app = express();
    this.server = http.createServer(app);
    this.server.listen(port, () => {
      console.info(`server listen port ${8081}`);
    });
  }

  start() {
    this.wss = new ws.Server({ server: this.server });
    this.wss.on("connection", (client) => {
      this.bindEvents(client);
    });
  }

  private bindEvents(client: ws) {
    client.on("message", (message) => {
      let { type, data } = JSON.parse(message.toString());
      console.info("message", type, data);
      let { toAddress, fromAddress, offer, answer } = data;
      let toClient = userManager.get(toAddress);
      let fromClient = userManager.get(fromAddress);
      switch (type) {
        case MessageType.LOGIN:
          userManager.login(data, client);
          break;
        case MessageType.CALL:
          toClient?.send(
            JSON.stringify({
              type: MessageType.OFFER,
              data: {
                fromAddress: fromAddress,
                toAddress: toAddress,
                offer,
              },
            })
          );
          break;
        case MessageType.ANSWER:
          fromClient?.send(
            JSON.stringify({
              type: MessageType.ANSWER,
              data: {
                fromAddress: fromAddress,
                toAddress: toAddress,
                answer,
              },
            })
          );
          break;
        default:
          break;
      }
    });
    client.on("close", (message) => {
      let address = userManager.getAddress(client);
      address && userManager.logout(address);
      console.info("close", message);
    });
    client.on("error", (message) => {
      console.info("error", message);
    });
  }
}
