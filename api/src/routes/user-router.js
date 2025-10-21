import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.route("/").post(userController.createUser);

export { userRouter };
