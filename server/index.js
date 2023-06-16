const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let nb = 0;
io.on("connection", (socket) => {
  const userID = socket.id;
  console.log(`Welcome UserID -> ${userID}!`);
  
  nb++;
  io.emit("here", nb);
  
  socket.on("disconnect", () => {
    console.log(`The User -> ${userID} Disconnected`);
    nb--;
    io.emit("here", nb);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
