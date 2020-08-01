export class WsClient {
  private ws?: WebSocket;

  connect(address: string) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(address);
      ws.addEventListener("open", () => {
        resolve();
      });
      ws.addEventListener("close", () => {
        this.ws = undefined;
      });
      ws.addEventListener("message", (message) => {
        this.message(message);
      });
      this.ws = ws;
    });
  }

  message = (data: any) => {};

  send(data: any) {
    if (!this.ws) return;
    if (this.ws.readyState === this.ws.CONNECTING) {
      this.ws.addEventListener("open", () => {
        this.ws?.send(JSON.stringify(data));
      });
    } else {
      this.ws.send(JSON.stringify(data));
    }
  }
}
