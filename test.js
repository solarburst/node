import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

const answer = await rl.question("What do you think of Node.js? ");

console.log(`Thank you for your valuable feedback: ${answer}`);

rl.close();