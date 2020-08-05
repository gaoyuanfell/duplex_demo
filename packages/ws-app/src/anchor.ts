import { VueConstructor } from "vue";
import { WsClient, MessageType } from "ws-core";
declare const Vue: VueConstructor;

let anchor = new WsClient();

!(async function () {
  await anchor.connect("ws://localhost:8081");
  anchor.send({
    type: MessageType.LOGIN,
    data: "anchor",
  });
})();

export { anchor };

// export const app = new Vue({
//   el: "#anchor",
// });
