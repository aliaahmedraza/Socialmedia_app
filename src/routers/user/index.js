import { Router } from "express";
import userController from "../../controllers/user/index.js";
import userValidator from "../../validator/user/index.js";
import AuthenticateMiddleware from "../../middleware/authentication.js";
const userRouter= Router();
userRouter.get("/profile", AuthenticateMiddleware, userController.get);
userRouter.get("/timeline", AuthenticateMiddleware, userController.getTimeline);
userRouter.get("/userfollowings", AuthenticateMiddleware, userController.getFollowings);
userRouter.get("/userfollowers", AuthenticateMiddleware, userController.getFollowers);
userRouter.post("/register",userValidator.create,userController.create);
userRouter.put("/user/:userId",userValidator.update,userController.update);
userRouter.delete("/user/:userId",userController.delete);
export default userRouter;