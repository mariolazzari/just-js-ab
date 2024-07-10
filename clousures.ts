// How clousures works
import { createServer, Socket } from "net";

function getGreeter(greet = "Ciao") {
  // const greet = "Ciao";

  return (name: string) => `${greet} ${name}`;
}

const greet = getGreeter();
const bye = getGreeter("Bye bye");

console.log(greet("Mario"));
console.log(bye("Mario"));

// private fields
function createAssertSecret() {
  const secret = "secret";

  return (arg: string) => {
    if (arg !== secret) {
      throw new Error("Wrong secret");
    }
  };
}

const assertSecret = createAssertSecret();
assertSecret("secret");

// createAssertSecret().secret -> error

export class Secret {
  private s = "secret";
  // #s in js2022
}

// mem
function createAverager() {
  let sum = 0;
  let count = 0;

  return (arg?: number) => {
    if (arg) {
      sum += arg;
      count++;
    }

    return count > 0 ? sum / count : 0;
  };
}

const avg = createAverager();
avg(1);
avg(2);
avg(3);

console.log("avg:", avg());
console.log("avg4", avg(4));

// nodejs
const s = createServer((socket: Socket) => {
  let nums: number[] = [];

  socket.on("data", (chunks: Buffer) => {
    const str = chunks.toString().trim();
    if (str === "") {
      const sum = nums.reduce((a, n) => a + n, 0);
      socket.write(sum.toString() + "\n\n");
      nums = [];
      return;
    }

    const n = +str;
    if (isNaN(n)) {
      return;
    }
    nums.push(n);
  });
});

s.listen(8088);
// nc localhost 8088
