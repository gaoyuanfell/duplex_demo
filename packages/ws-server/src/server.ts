import core from "ws-core";
import ws, { Server as WsServer } from "ws";
import express from "express";
import https from "https";
import fs from "fs";
const app = express();

const options = {
  key: fs.readFileSync("./privatekey.pem"),
  cert: fs.readFileSync("./certificate.pem"),
};

const server = https.createServer(options, app);

const wss: WsServer = new ws.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.info(message);
  });
});

server.listen(8081, () => {
  console.info("WebSocket server start 8081 port");
});
