import { Router } from "express";
import authRouter from "./Auth/index.js";
import userRouter from "./user/index.js";
import postRouter from "./post/index.js";
import commentRouter from "./comments/index.js";
import followerRouter from "./Follower/index.js";
const allRouter = Router();
allRouter.use(userRouter);
allRouter.use(postRouter);
allRouter.use(commentRouter);
allRouter.use(authRouter);
allRouter.use(followerRouter);
export default allRouter;