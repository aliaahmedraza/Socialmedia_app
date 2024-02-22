import { Router } from "express";
import userFollowController from "../../controllers/Follower/index.js";
const followerRouter= Router();
followerRouter.post(userFollowController.path,userFollowController.createFollow);
// followerRouter.get('/userfollow/:id',userFollowController.getFollow);
export default followerRouter;