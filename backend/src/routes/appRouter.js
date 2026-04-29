
import { Router } from 'express';
const appRouter = Router();
import  { 
 } from "../controllers/appController.js";
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


export default appRouter;