import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io";

const app = express()
const server = http.createServer(app)
const io = new Server(server);

//Socket.io connection
io.on("connection", (socket) => {
    socket.on("chat message", (data)=>{
        console.log("A new user message:", data)
        io.emit("chat message", data)
    })
});
//http requests
app.use(express.static(path.resolve("./public")))
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"))
})

server.listen(9000, ()=> console.log("Server is running on port 9000"))