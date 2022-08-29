import express from "express";
import fetch from "isomorphic-fetch";

const app = express();

app.get("/", async (req, res) => {
  const news = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c4c3975e612549c1bcd87bfbc90a0081"
  ).then((resp) => resp.json());
  res.send(news);
});

app.listen(3000, () => {
  console.log("Listen port 3000");
});
