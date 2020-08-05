import { DuplexConnectServe } from "./duplex.connect.serve";
import { MessageType } from "./index";
import { map } from "rxjs/operators";

export class Duplex {
  peer: RTCPeerConnection;
  server: DuplexConnectServe;
  constructor(address: string, configuration?: RTCConfiguration) {
    this.peer = new RTCPeerConnection(configuration);
    this.server = new DuplexConnectServe(address);

    this.server.message$.pipe(map((d: any) => JSON.parse(d))).subscribe((d) => {
      this.messageSwitch(d);
    });
  }

  async messageSwitch(d: any) {
    let { type, data } = d;
    let { fromAddress, toAddress, offer, answer } = data;
    switch (type) {
      case MessageType.OFFER:
        let _answer = await this.b1(offer);
        this.server.send$.next({
          type: MessageType.ANSWER,
          data: {
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            answer: _answer,
          },
        });
        break;
      case MessageType.ANSWER:
        await this.a2(answer);

        let cdc = this.peer.createDataChannel("sendDataChannel");

        cdc.addEventListener("open", () => {
          console.info("datachannel open");
        });

        cdc.addEventListener("message", (message: MessageEvent) => {
          console.info(message, message.data);
        });

        setInterval(() => {
          if (cdc.readyState === "open") {
            cdc.send(Date.now().toString());
          } else {
            console.info("loding...");
          }
        }, 1000);

        break;
    }
  }

  async a1() {
    let offer: RTCSessionDescriptionInit = await this.peer.createOffer();
    this.peer.setLocalDescription(offer);
    return offer;
  }

  async b1(offer: RTCSessionDescriptionInit) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    let answer: RTCSessionDescriptionInit = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async a2(answer: RTCSessionDescriptionInit) {
    this.peer.setRemoteDescription(new RTCSessionDescription(answer));
  }
}
