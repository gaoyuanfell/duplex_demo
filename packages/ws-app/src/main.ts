import { MessageType } from "ws-core";
// https://192.168.2.32:8000/
let socket: WebSocket = new WebSocket("ws://192.168.2.32:8081");

console.info(socket);

socket.addEventListener("message", (message) => {
  console.info("message", message);
});

socket.addEventListener("open", (message) => {
  console.info("open", message);
});

socket.addEventListener("close", (message) => {
  console.info("close", message);
});

(window as any).socket = socket;

console.info(MessageType);

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
