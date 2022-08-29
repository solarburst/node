import express from "express";
import fs from "fs";

let files = [];
let globalPath = "./";
let page = `
<form action="http://localhost:3000/" method="post">
    <legend>Путь к файлу</legend>
    <fieldset>
        <input name="filePath" type="text">
    </fieldset>
    <fieldset>
        <ul id="pathes">
        ${files}
        </ul>
    </fieldset>
    <button type="submit">Next</button>
</form>`;
const fileFilter = (fileOrDir) => fs.lstatSync(fileOrDir).isFile();

const getDirectoriesAndSendPage = (path, res) => {
  const list = fs.readdirSync(path);
  const filesLinks = [];
  for (path of list) {
    const item = `<li><input type="radio" name="fileName" value=${path}>${path}</li>`;
    filesLinks.push(item);
  }
  files = [...filesLinks];
  page = `
    <form action="http://localhost:3000/" method="post">
        <legend>Путь к файлу</legend>
        <fieldset>
            <input name="filePath" type="text">
        </fieldset>
        <fieldset>
            <ul id="pathes">
            ${files}
            </ul>
        </fieldset>
        <button type="submit">Next</button>
    </form>`;
  res.send(page);
};

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app
  .get("/", (req, res) => {
    getDirectoriesAndSendPage("./", res);
  })
  .post("/", (req, res) => {
    const body = req.body;

    if (body.fileName) {
      if (fileFilter(globalPath + `\\${body.fileName}`)) {
        globalPath += `${body.fileName}/`;
        const file = fs.readFileSync(globalPath, "utf-8");
        res.send(file);
      } else {
        globalPath += `${body.fileName}/`;
        getDirectoriesAndSendPage(globalPath, res);
      }
    } else {
      globalPath = body.filePath;
      getDirectoriesAndSendPage(globalPath, res);
    }
  });

app.listen(3000, () => {
  console.log("Listen port 3000");
});
