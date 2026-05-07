import passport from "passport";

export function authenticateLocal(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Incorrect username or password"
      });
    }

    req.user = user;
    next();

  })(req, res, next);
}

export function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "You are not currently signed in"
      });
    }

    req.user = user;

    next();

  })(req, res, next);
}


export function optionalAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {

    if (err) return next(err);

    if (user) {
      req.user = user;
    }
    else if(info){
      req.authError = info.message; //optional visibility
    }


    next();

  })(req, res, next);
}
