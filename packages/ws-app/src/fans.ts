import { WsClient, MessageType } from "ws-core";

let fans = new WsClient();

!(async function () {
  await fans.connect("ws://localhost:8081");
  fans.send({
    type: MessageType.LOGIN,
    data: "fans",
  });
})();

export { fans };
