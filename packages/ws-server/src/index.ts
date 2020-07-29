import { WsServerHelper } from "./server";

const bootstrap = () => {
  let ws = new WsServerHelper();
  ws.start();
};

bootstrap();
