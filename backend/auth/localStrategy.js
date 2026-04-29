import passport from 'passport';
import LocalStrategy from 'passport-local'
import { validPassword } from '../lib/passwordUtils.js';
import { 
  getUserByUsername
 } from '../repositories/queries.js';

async function verifyCallback(username, password, done) {
  try {
    const user = await getUserByUsername( username );
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' }); 
    }
    const match = await validPassword(password, user.hash);
    if(!match){
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  }
  
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
