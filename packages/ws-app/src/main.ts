import { a } from "ws-core";

export function test() {
  return 1 + 1;
}

export class Test {
  test() {
    console.info("ok", a);
  }
}

console.info(test());
new Test().test();
