import express from "express";
import appRouter from "./routes/appRouter.js";
import cors from "cors";

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});


/** -------------   GENERAL SETUP   -------------  **/

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** ----------   PASSPORT AUTHENTICATION   ----------- **/

import "../auth/jwtStrategy.js";
import "../auth/localStrategy.js";

/** -------------------   ROUTERS   -------------------- **/
app.use("/", appRouter);


/** -------------------   SERVER   -------------------- **/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //TODO
  //res.render('error');
  console.log(err.stack);
  console.log(err.message);
  res.send("Something went wrong.", err.stack, err.message);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error)
        throw error;
    console.log(`App is listening at port ${PORT}`);
});
