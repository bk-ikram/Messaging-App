import { 
    insertUser,
    getChatsRepo,
    getChatDetailsRepo,
    insertMessage,
 } from "../../repositories/queries.js";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { genPassword } from '../../lib/passwordUtils.js'
import { getIO } from "../../socket.js";

const signupPost = async( req, res, next) => {
    try{

        const { username, email, password } = req.body;
        //generate hashed password
        const hashedPassword = await genPassword(password);
        console.log(hashedPassword);
        //need to insert user into the db
        const user = await insertUser(username, email ,hashedPassword);
        
        console.log(`User ${username} has been created.`)
        const payload = {
            sub: user.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.userName
            }
        });
        }
    catch (err) {
        next(err);
    }
};


const signinPost = async( req, res, next) => {
    try{

        const user = req.user;

        const payload = {
            sub: user.id,

        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.userName
            }
        });
        }
    catch (err) {
        next(err);
    }
};

const getChats = async(req, res) => {
    const userId = req.user.id;
    const chats = await getChatsRepo(userId);
    return res.json(chats);
}


const getChatDetails = async(req, res) => {
    const chatId = Number(req.params?.chatId);
    if(!chatId)
        return res.status(404).json({msg:"No Chat selected"});
    const chatDetails = await getChatDetailsRepo(chatId);
    return res.json(chatDetails);
}   

const postMessage = async(req, res) => {
    const chatId = Number(req.params?.chatId);
    const userId = Number(req.user.id);
    const message = req?.body?.message;
    if(!chatId)
        return res.status(404).json({msg:"No Chat selected"});
    const createdMessage = await insertMessage(userId, chatId, message);
    res.json(createdMessage);
    //emit through socket
    getIO().to(chatId).emit('new_message', createdMessage);
    return;
}   

export default {
    signupPost,
    signinPost,
    getChats,
    getChatDetails,
    postMessage,
}