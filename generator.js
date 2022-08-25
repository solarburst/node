import fs from "fs";

const random = () => {
  const firstNum = Math.floor(Math.random() * 256);
  const secondNum = Math.floor(Math.random() * 256);
  const thirdNum = Math.floor(Math.random() * 256);
  const fourthNum = Math.floor(Math.random() * 256);

  return `${firstNum}.${secondNum}.${thirdNum}.${fourthNum} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"\n`;
};

const generateFile = (name) => {
  return new Promise((resolve, reject) => {
    const file = fs.openSync(name, "w");
    resolve(true);
  });
};

generateFile("access.log");

const fillFile = (name, size) => {
  fs.stat(name, (err, stats) => {
    const fileSize = stats.size;
    if (fileSize < size) {
      const ip = random();
      fs.appendFile(name, ip, (err) => {
        if (err) throw err;
      });
      fillFile(name, size);
    }
  });
};

fillFile("access.log", 1000); //10485760
