import { Router } from "express";
import authController from "../../controllers/Auth/index.js";
// import AuthenticateMiddleware from "../../middleware/authentication.js";

const authRouter = Router();
authRouter.post("/login",authController.login);
export default authRouter;