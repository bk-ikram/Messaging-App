import { prisma } from "../lib/prisma.js" ;

function insertUser(username, email,hashedPassword){
    return prisma.user.create({
        data: {
            userName: username,
            email: email,
            hash: hashedPassword,
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

export { 
    insertUser,
    getUserById,
    getUserByUsername,
 };