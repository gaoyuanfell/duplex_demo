import { MessageType, WsClient } from "ws-core";

import { VueConstructor } from "vue";

declare const Vue: VueConstructor;

let wsClient: WsClient = new WsClient(); //= new WebSocket("ws://192.168.2.32:8081");

var rtcp = new RTCPeerConnection();

var cdc: RTCDataChannel;

const app = new Vue({
  el: "#app",
  data() {
    return {
      address: "",
      url: "ws://localhost:8081",
      callTarget: "",
    };
  },
  created() {
    wsClient.message = this.message;
    let url = new URL(location.href);
    this.address = url.searchParams.get("address") || "";
  },
  mounted() {
    this.init();
  },
  methods: {
    login() {
      wsClient.send({
        type: MessageType.LOGIN,
        data: this.address,
      });
    },
    async connect() {
      await wsClient.connect(this.url);
      console.info(this.address, "服务器连接成功");
    },
    async init() {
      await this.connect();
      if (this.address) this.login();
      rtcp.addEventListener("datachannel", (event: RTCDataChannelEvent) => {
        console.info(this.address, event, event.channel);
      });
      rtcp.addEventListener("icecandidate", (event: RTCPeerConnectionIceEvent) => {
        console.info(this.address, event);
      });
    },
    async call() {
      let offer: RTCSessionDescriptionInit = await rtcp.createOffer();
      console.info(this.address, offer);
      await rtcp.setLocalDescription(offer);
      wsClient.send({
        type: MessageType.CALL,
        data: {
          toAddress: this.callTarget,
          fromAddress: this.address,
          offer, //: rtcp.localDescription,
        },
      });
    },

    async offer(data: any) {
      // await rtcp.setRemoteDescription(data.offer);
      await rtcp.setRemoteDescription(new RTCSessionDescription(data.offer));

      let answer: RTCSessionDescriptionInit = await rtcp.createAnswer();
      console.info(this.address, answer);
      await rtcp.setLocalDescription(answer);

      wsClient.send({
        type: MessageType.ANSWER,
        data: {
          fromAddress: data.fromAddress,
          toAddress: data.toAddress,
          answer, //: rtcp.localDescription,
        },
      });
    },

    async answer(data: any) {
      // await rtcp.setRemoteDescription(data.answer);
      await rtcp.setRemoteDescription(new RTCSessionDescription(data.answer));

      cdc = rtcp.createDataChannel("sendDataChannel");

      cdc.addEventListener("open", () => {
        console.info(this.address, "datachannel open");
      });

      cdc.addEventListener("message", (message: MessageEvent) => {
        console.info(this.address, message, message.data);
      });

      setInterval(() => {
        if (cdc.readyState === "open") {
          cdc.send(Date.now().toString());
        } else {
          console.info(this.address, "loding...");
        }
      }, 1000);
    },

    async message(message: MessageEvent) {
      let { type, data } = JSON.parse(message.data);
      console.info(this.address, data);
      switch (type) {
        case MessageType.ANSWER:
          console.info(this.address, "answer");
          this.answer(data);
          break;
        case MessageType.OFFER:
          console.info(this.address, "offer");
          this.offer(data);
          break;
        default:
          break;
      }
    },
  },
});

/**
 * A > B
 *
 *
 *
 *
 *
 *
 */

/**

socket.addEventListener("message", async ({ data }) => {
      let message = JSON.parse(data);
      switch (message.type) {
        case "userMedia":
          console.info("1");
          pc = new RTCPeerConnection(null);

          pc.onicecandidate = (event) => {
            if (event.candidate) {
              send({
                type: "candidate",
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
              });
            }
          };

          pc.onaddstream = (event) => {
            console.info("remoteVideo");
            // this.$refs.remoteVideo.srcObject = event.stream;
            this.remoteList.push(event.stream);

            let video = document.createElement("video");
            video.autoplay = true;
            video.srcObject = event.stream;

            this.$refs.videoBox.appendChild(video);
          };

          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });

          //
          let offer = await pc.createOffer();
          pc.setLocalDescription(offer);
          //
          send(offer);
          break;
        case "offer":
          console.info("2");

          pc.setRemoteDescription(new RTCSessionDescription(message));

          //
          let answer = await pc.createAnswer({
            mandatory: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true,
            },
          });
          pc.setLocalDescription(answer);
          send(answer);
          break;
        case "answer":
          console.info("3");
          pc.setRemoteDescription(new RTCSessionDescription(message));
          break;
        case "candidate":
          console.info("4");
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          });
          pc.addIceCandidate(candidate);
          break;
      }
    });


 */
