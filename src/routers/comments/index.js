import { Router } from "express";
import commentController from "../../controllers/comments/index.js";
import commentValidator from "../../validator/comment/index.js";
const commentRouter= Router();
commentRouter.get(commentController.path,commentController.get);
commentRouter.post(commentController.path,commentValidator.create,commentController.create);
commentRouter.put('/comment/:commentId',commentValidator.update,commentController.update);
commentRouter.delete('/comment/:commentId',commentController.delete);

export default commentRouter;