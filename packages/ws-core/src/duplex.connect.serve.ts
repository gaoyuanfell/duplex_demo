import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export class DuplexConnectServe {
  send$ = new Subject<any>();
  open$ = new Subject();
  close$ = new Subject();
  message$ = new Subject();
  destroy$ = new Subject();

  constructor(address: string) {
    const ws: WebSocket = new WebSocket(address);
    ws.addEventListener("open", () => {
      this.open$.next();
    });
    ws.addEventListener("close", () => {
      this.close$.next();
    });
    ws.addEventListener("message", (message: MessageEvent) => {
      this.message$.next(message.data);
    });

    this.send$
      .pipe(filter(() => ws.readyState === ws.OPEN))
      .subscribe((data) => {
        ws.send(JSON.stringify(data));
      });
  }
}
