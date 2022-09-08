const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const usersMap = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("connection", () => {
    console.log("connect!");
    socket.emit("chat message", `${socket.id} connected`);
  });

  usersMap[socket.id] = {
    id: socket.id,
  };

  socket.on("disconnect", () => {
    io.emit("chat message", `${socket.id} disconnected`);
    console.log("disconnect");
    delete usersMap[socket.id];
  });

  console.log(usersMap);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
