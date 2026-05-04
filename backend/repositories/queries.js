import { prisma } from "../lib/prisma.js" ;

function insertUser(username, email,hashedPassword){
    return/* prisma.user.create({
        data: {
            userName: username,
            email: email,
            hash: hashedPassword,
            chats:
        }
    });*/
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
    const chats = await prisma.user.findUnique({
        where: { id: id },
        select: {
            chats: {
                select: {
                    id: true,
                    name: true,
                    users: true
                }
            }
        }
    })
    return chats;
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
                            username: true
                        }
                    }
                }
            }
        }
    })
    return details;
};



export { 
    insertUser,
    getUserById,
    getUserByUsername,
    getChatsRepo,
    getChatDetailsRepo,
 };