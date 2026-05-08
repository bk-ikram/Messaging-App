# Messaging App

A full-stack real-time messaging application built with React, Express, Prisma, PostgreSQL, JWT authentication, and Socket.IO.

This project was built as part of The Odin Project curriculum and focuses on building a modern chat application with authentication, protected routes, persistent login sessions, and real-time communication.

---

## Features

- User registration and login
- JWT-based authentication
- Protected API routes
- Persistent login using `localStorage`
- Real-time messaging with Socket.IO
- Group chat support
- Global chat automatically joined on signup
- Password hashing with bcrypt
- Responsive frontend using React + Vite
- PostgreSQL database with Prisma ORM
- Auto logout when JWT expires
- Live message updates without page refresh

---

# Tech Stack

## Frontend
- React
- Vite
- React Context API
- Socket.IO Client
- Day.js
- CSS Modules

## Backend
- Node.js
- Express
- Passport.js
- Passport Local Strategy
- Passport JWT Strategy
- Socket.IO
- Prisma ORM
- PostgreSQL

---

# Project Structure

```txt
Messaging-App/
│
├── backend/
│   ├── auth/
│   ├── middleware/
│   ├── repositories/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── app.js
│   └── socket.js
│
├── messaging/
│   ├── src/
│   │   ├── Components/
│   │   ├── api/
│   │   └── utils/
│   └── vite.config.js
│
└── README.md
```

---

# Authentication Flow

The app uses JWT authentication.

## Signup / Login

1. User submits credentials
2. Backend validates credentials
3. JWT token is generated
4. Token is stored in localStorage
5. Frontend sends token in Authorization headers

## Protected Requests

Protected routes use Passport JWT middleware:

```js
Authorization: Bearer <token>
```

## Token Expiry Handling

The frontend automatically:
- detects expired JWTs
- clears local storage
- logs the user out

---

# Real-Time Messaging

Socket.IO powers live chat updates.

## Flow

1. Client connects to socket server
2. User joins a chat room
3. Messages are emitted to that room
4. All connected users instantly receive updates

Backend event:

```js
getIO().to(chatId).emit('new_message', createdMessage);
```

Frontend listener:

```js
socketRef.current.on("new_message", (data) => {
    addMessageToState(data);
});
```

---

# Database

The backend uses PostgreSQL with Prisma ORM.

Main models include:
- User
- Chat
- Message

Relationships:
- Users can belong to many chats
- Chats contain many messages
- Messages belong to one author and one chat

---

# Installation

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Messaging-App
```

---

# Backend Setup

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
PORT=3000
```

---

## 4. Run Prisma Migrations

```bash
npx prisma migrate dev
```

(Optional)

```bash
npx prisma studio
```

---

## 5. Start Backend Server

```bash
node src/app.js
```

Server runs on:

```txt
http://localhost:3000
```

---

# Frontend Setup

## 6. Install Frontend Dependencies

```bash
cd messaging
npm install
```

## 7. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Routes

## Authentication

### Signup

```http
POST /api/signup
```

Body:

```json
{
  "username": "testuser",
  "email": "test@test.com",
  "password": "password123"
}
```

---

### Signin

```http
POST /api/signin
```

Body:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

---

## Chats

### Get User Chats

```http
GET /api/chats
```

Requires JWT token.

---

### Get Chat Details

```http
GET /api/chat/:chatId
```

---

### Send Message

```http
POST /api/chat/:chatId
```

Body:

```json
{
  "message": "Hello world"
}
```

---

# Current Improvements Planned

Some areas still being improved:

- Better validation with `express-validator`
- Read receipts
- Typing indicators
- Direct messages
- Mobile-first UI improvements
- Better error handling
- Online/offline presence
- Chat creation UI
- Message pagination
- File uploads

---

# Lessons Learned

This project helped reinforce:

- JWT authentication architecture
- Real-time systems with WebSockets
- React state synchronization
- Protected route design
- Prisma relational queries
- Socket room management
- Persistent auth handling
- Full-stack application structure

---

# License

This project is open source and available under the MIT License.
