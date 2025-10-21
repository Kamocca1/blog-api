import { Router } from "express";
import { authController } from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.route("/").post(authController.loginHandler);
authRouter
    .route("/session")
    .get(authController.checkLoginHandler)
    .delete(authController.logoutHandler);

export { authRouter };
