import axios from "axios";
import express from "express";

const app = express();

app.get("/:word", async (req, res) => {
  const translate = await getTranslation(req.params.word);
  res.send(translate);
});

const getTranslation = (word) => {
  const API_KEY =
    "trnsl.1.1.20180122T071333Z.0f8a40f114d4aebb.ac8ea01cff1ff36fcf861ee0250c74fd6b27c595";

  const transApiUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&lang=en-ru&text=${word}`;

  return axios
    .post(transApiUrl)
    .then(function (response) {
      response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
};

app.listen(3000, () => {
  console.log("Listen port 3000");
});
