import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { isChatMember } from "./repositories/queries.js";

let io;

export function initIO(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET","POST"],
    }
  });

  // runs once per connection attempt, before 'connection' fires
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if(!token) {
      return next(new Error("Authentication required"));
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.sub; //attach to socket for later use
      next();
    } catch (err) {
      return next(new Error("Invalid or expired token"));
    }
    
  })

  io.on('connection', (socket) => {
    const userId = Number(socket.userId)
    console.log('a user connected: ', userId);
    
    socket.on("join_room", async (chatId) => {
      //verify this user belongs to this chat before joining
      const isMember = (  !! (await isChatMember(userId, Number(chatId))));

      if( !isMember ){
        socket.emit("error", "You are not a member of this chat");
        return;
      }

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