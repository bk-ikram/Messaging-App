import { prisma } from "../lib/prisma.js"

async function main(){
    
    //create the global group chat
    await prisma.chat.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        name: "Global"
    }
});
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Created seed data in DB.");
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        console.log("Could not create seed data in DB.");
        process.exit(1);
    });
