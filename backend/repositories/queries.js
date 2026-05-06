import { prisma } from "../lib/prisma.js" ;

const GLOBAL_CHAT_ID = 1;

function insertUser(username, email,hashedPassword){
    return prisma.user.create({
        data: {
            userName: username,
            email: email,
            hash: hashedPassword,
            chats: {
                connect: { id: GLOBAL_CHAT_ID }
            }
        }
    });
}

async function getUserByUsername(username){
    const user = prisma.user.findUnique({
        where: { userName: username },
    })
    return user;
};

async function getUserById(id){
    const user = await prisma.user.findUnique({
        where: { id: id },
    })
    return user;
};

async function getChatsRepo(id){
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
            chats: {
                select: {
                    id: true,
                    name: true,
                    users: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        }
    })
    const groupChats = user.chats.filter(c=> (c.users.length > 2 || c.id === GLOBAL_CHAT_ID));
    return groupChats;
};

async function getChatDetailsRepo(id){
    const details = await prisma.chat.findUnique({
        where: { id: id },
        select: {
            id: true,
            messages: {
                select: {
                    id: true,
                    message: true,
                    timestamp: true,
                    read: true,
                    author: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        }
    })
    return details;
};

async function insertMessage(userId, chatId, message){
    return prisma.message.create({
        data: {
            message: message,
            author: {
                connect: { id: userId }
            },
            chat: {
                connect: { id: chatId }
            }
        },
        include: {
            author: {
                select: {
                    userName: true
                }
            }
        }
    })
}


export { 
    insertUser,
    getUserById,
    getUserByUsername,
    getChatsRepo,
    getChatDetailsRepo,
    insertMessage,
 };