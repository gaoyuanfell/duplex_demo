export function test() {
  return 1 + 1;
}

export class Test {
  test() {
    console.info("ok");
  }
}

console.info(test());
new Test().test();
