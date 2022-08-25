import fs from "fs";
import readline from "readline";

const readFile = () => {
  const read = fs.createReadStream("./access.log", "utf-8");
  const rl = readline.createInterface({
    input: read,
  });

  rl.on("line", (input) => {
    const format = input.replace(/ [\s\S]+/, "\n");
    fs.appendFile("format.log", format, (err) => {
      if (err) throw err;
    });
  });
};

const searchIp = (ip) => {
  const file = fs.openSync(`${ip}_requests.log`, "w");

  const read = fs.createReadStream("./access.log", "utf-8");
  const rl = readline.createInterface({
    input: read,
  });

  rl.on("line", (input) => {
    const format = input.replace(/ [\s\S]+/, "\n");
    if (input.match(ip)) {
      fs.appendFile(`${ip}_requests.log`, input, (err) => {
        if (err) throw err;
      });
    }
  });
};

searchIp("197.76.3.246");
