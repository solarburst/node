import fs from "fs";
import * as readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = async (fileName) => {
  fs.open(`logs/${fileName}.txt`, "a+", (err) => {
    if (err) throw err;
    console.log("Файл создан");
  });

  let endGame = false;

  while (!endGame) {
    const answer = await new Promise((resolve) => {
      rl.question("Введите 1 или 2\n ", resolve);
    });

    let rand = Math.floor(Math.random() * 2) + 1;
    console.log(rand, "rand");

    if (rand === Number(answer)) {
      console.log("Вы победили");
      fs.appendFile(`logs/${fileName}.txt`, "Win\n", (err) => {
        if (err) throw err;
        console.log("Результат записан");
      });
    } else {
      console.log("Вы проиграли");
      fs.appendFile(`logs/${fileName}.txt`, "Lose\n", (err) => {
        if (err) throw err;
        console.log("Результат записан");
      });
    }

    const exit = await new Promise((resolve) => {
      rl.question("Выйти из игры? (y/n)\n ", resolve);
    });

    if (exit === "y") {
      endGame = true;
      rl.close();
    }
  }
};

game("qwerty");
