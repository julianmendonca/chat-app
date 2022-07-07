import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: [
      "http://192.168.0.71:3000",
      "http://localhost:3000",
      "https://chat-app-fe-zeta.vercel.app/",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("Well done!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");
  socket.join("chat");
  socket.on("send message", function (data) {
    socket.to("chat").emit("send message", data);
    socket.emit("send message", data);
  });
});
