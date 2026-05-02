import { 
    insertUser,
 } from "../../repositories/queries.js";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { genPassword } from '../../lib/passwordUtils.js'

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

export default {
    signupPost,
    signinPost,
}