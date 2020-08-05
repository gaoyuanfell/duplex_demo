import { VueConstructor } from "vue";
declare const Vue: VueConstructor;

import { anchor } from "./anchor";
import { fans } from "./fans";
import { MessageType } from "ws-core";

// const anchorRtc = new RTCPeerConnection();
// const fansRtc = new RTCPeerConnection();

new Vue({
  el: "#app",
  data() {
    return {
      roomId: Date.now(),
      type: "",
      rtc: new RTCPeerConnection(),
    };
  },
  created() {
    let params = new URL(location.href).searchParams;
    this.type = params.get("type") || "";
  },
  mounted() {
    switch (this.type) {
      case "anchor":
        anchor.message = (e: MessageEvent) => {
          console.info("anchor", e);
        };
        setInterval(() => {
          anchor.send({
            type: MessageType.PING,
          });
        }, 1000);
        break;
      case "fans":
        fans.message = (e) => {
          console.info("fans", e);
        };
        setInterval(() => {
          fans.send({
            type: MessageType.PING,
          });
        }, 1000);
        break;
    }
  },
  methods: {
    async play() {
      await this.openMedia();
      anchor.send({
        type: MessageType.CREATE_ROOM,
        data: {
          fromAddress: "anchor",
          roomId: this.roomId,
        },
      });
      this.playConnect();
    },
    async openMedia() {
      let mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      (this.$refs.anchor as HTMLVideoElement).srcObject = mediaStream;
      mediaStream.getTracks().forEach((track) => this.rtc.addTrack(track, mediaStream));
    },
    async playConnect() {
      let offer = await this.rtc.createOffer();
      this.rtc.setLocalDescription(offer);
      anchor.send({
        type: MessageType.OFFER,
        data: {
          fromAddress: "anchor",
          roomId: this.roomId,
          sdp: offer.sdp,
        },
      });
    },
    /////////////////////////
    async call() {
      let answer = await this.rtc.createAnswer();
      this.rtc.setLocalDescription(answer);
      fans.send({
        type: MessageType.ANSWER,
        data: {
          fromAddress: "fans",
          roomId: this.roomId,
          sdp: answer.sdp,
        },
      });
    },
    show() {},
  },
});

// import { Duplex, MessageType } from "ws-core";

// const app = new Vue({
//   el: "#app",
//   data() {
//     return {
//       address: "",
//       url: "ws://localhost:8081",
//       callTarget: "",
//       duplex: new Duplex("ws://localhost:8081"),
//     };
//   },
//   created() {
//     let url = new URL(location.href);
//     this.address = url.searchParams.get("address") || "";
//     this.duplex.server.open$.subscribe(() => {
//       this.login();
//     });
//   },
//   mounted() {},
//   methods: {
//     login() {
//       this.duplex.server.send$.next({
//         type: MessageType.LOGIN,
//         data: this.address,
//       });
//     },
//     async call() {
//       let offer: RTCSessionDescriptionInit = await this.duplex.a1();
//       this.duplex.server.send$.next({
//         type: MessageType.CALL,
//         data: {
//           toAddress: this.callTarget,
//           fromAddress: this.address,
//           offer,
//         },
//       });
//     },
//   },
// });

/* let localConnection = new RTCPeerConnection();
let remoteConnection = new RTCPeerConnection();

async function init() {
  let offer = await localConnection.createOffer();

  await localConnection.setLocalDescription(offer);

  localConnection.localDescription && (await remoteConnection.setRemoteDescription(localConnection.localDescription));
  let answer = await remoteConnection.createAnswer();
  await remoteConnection.setLocalDescription(answer);
  remoteConnection.localDescription && (await localConnection.setRemoteDescription(remoteConnection.localDescription));

  let lo = localConnection.createDataChannel("123");
  lo.addEventListener("open", () => {
    console.info("open");
  });

  let ro = remoteConnection.createDataChannel("123");
  ro.addEventListener("open", () => {
    console.info("open");
  });
  ro.addEventListener("message", (message: MessageEvent) => {
    console.info(message);
  });
}

init();

localConnection.addEventListener("icecandidate", (event) => {
  console.info(event.candidate);
});

remoteConnection.addEventListener("icecandidate", (event) => {
  console.info(event.candidate);
});

remoteConnection.addEventListener("datachannel", (d) => {
  console.info(d);
});
 */
