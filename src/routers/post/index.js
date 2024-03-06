import { Router } from "express";
import postController from "../../controllers/post/index.js";
import postValidator from "../../validator/post/index.js";
import AuthenticateMiddleware from "../../middleware/authentication.js";
const postRouter= Router();
postRouter.get(postController.path,postController.get);
postRouter.post(postController.path,AuthenticateMiddleware,postValidator.create,postController.create);
postRouter.put('/post/:postId',postValidator.update,postController.update);
postRouter.delete('/post/:postId',postController.delete);

export default postRouter;