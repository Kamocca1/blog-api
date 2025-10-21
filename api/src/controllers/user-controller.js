import { userService } from "../services/user-service.js";
import CustomError from "../utils/custom-error.js";

const userController = {
    createUser: async (req, res, next) => {
        try {
            const user = await userService.createUser(
                req.body.username,
                req.body.password
            );
            res.status(201).json({ message: "User created successfully." });
        } catch (err) {
            if (err.code == "P2002") {
                next(new CustomError(409, "This username is already taken."));
            }
            next(err);
        }
    },
};

export { userController };
