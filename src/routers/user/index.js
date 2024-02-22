import { Router } from "express";
import userController from "../../controllers/user/index.js";
import userValidator from "../../validator/user/index.js";
const userRouter= Router();
userRouter.get(userController.path,userController.get);
userRouter.post(userController.path,userValidator.create,userController.create);
userRouter.put("/user/:userId",userValidator.update,userController.update);
userRouter.delete("/user/:userId",userController.delete);
export default userRouter;