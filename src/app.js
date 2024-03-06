import "dotenv/config";
import  Express  from "express"; 
import { Dbconnection } from "./Db/config.js";
import dbInit from "./Db/init.js";
import allRouter from "./routers/index.js";
import bodyParser from "body-parser";
const app = Express();
Dbconnection();
dbInit();
// console.log(process.env, "DB_HOST");
app.use(bodyParser.json())
app.use(allRouter);
app.use(Express.json());
app.listen('3002',console.log("Server Started")); 