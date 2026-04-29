import passport from 'passport';
import { getUserById } from '../repositories/queries.js'


import { ExtractJwt
    , Strategy as JwtStrategy } from 'passport-jwt';


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


async function verify(jwt_payload, done) {
    try{
        const userId = jwt_payload.sub;
        const user = await getUserById(userId);
        if(!user) {
             return done(null, false)
        }
        return done(null, user);
    }
    catch(err){
        return done(err);
    }

}

const strategy = new JwtStrategy(opts,verify);

passport.use(strategy);