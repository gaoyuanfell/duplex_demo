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
      console.info("message", message);
    });
    client.on("close", (message) => {
      console.info("close", message);
    });
    client.on("error", (message) => {
      console.info("error", message);
    });
  }
}
