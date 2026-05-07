import { Server } from "socket.io";
let io;

export function initIO(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET","POST"],
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("join_room", (chatId) => {
      socket.join(chatId);
    });

    socket.on("leave_room", (chatId) => {
      socket.leave(chatId);
    })
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}