import express from "express";
import fetch from "isomorphic-fetch";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app
  .get("/", async (req, res) => {
    const info = await fetch("http://localhost:3000/chats").then((resp) =>
      resp.json()
    );
    res.send(info);
  })
  .get("/:id", async (req, res) => {
    const info = await fetch(
      "http://localhost:3000/chats/" + req.params.id
    ).then((resp) => resp.json());
    res.send(info);
  })
  .post("/", async (req, res) => {
    const info = await fetch("http://localhost:3000/chats", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    res.send(info);
  })
  .put("/:id", async (req, res) => {
    const info = await fetch("http://localhost:3000/chats/" + req.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    res.send(info);
  })
  .delete("/:id", async (req, res) => {
    const info = await fetch("http://localhost:3000/chats/" + req.params.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    res.send(info);
  });

app.listen(3030, () => {
  console.log("Listen port 3030");
});
