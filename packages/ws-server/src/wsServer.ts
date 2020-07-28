import { MessageType } from "ws-core";
import ws, { Server as WsServer } from "ws";
import express, { Express } from "express";
import https, { Server } from "https";
import fs from "fs";

const options = {
  key: fs.readFileSync("./privatekey.pem"),
  cert: fs.readFileSync("./certificate.pem"),
};

export class WsServerHeple {
  app: Express;
  server: Server;
  constructor() {
    this.app = express();
    this.server = https.createServer(options, this.app);
  }
}
