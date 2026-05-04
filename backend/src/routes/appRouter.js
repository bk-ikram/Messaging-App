
import { Router } from 'express';
const appRouter = Router();
import  appController from "../controllers/appController.js";
import passport from 'passport';
import { authenticateLocal
        ,authenticateJWT
        ,isUserAuthor,
        optionalAuth
 } from '../../middleware/authMiddleware.js'

//universal
appRouter.use((req, res, next) => {
    if(req.user) res.locals.user = req.user;
    next();
})

appRouter.post("/api/signin"
                ,authenticateLocal
                ,appController.signinPost);

appRouter.post("/api/signup"
                ,appController.signupPost);


appRouter.get("/api/chats"
                ,authenticateJWT
                ,appController.getChats);

appRouter.get("/api/chat/:chatId"
                ,authenticateJWT
                ,appController.getChatDetails);

export default appRouter;