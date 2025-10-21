import { userService } from "../services/user-service.js";
import CustomError from "../utils/custom-error.js";

export const authController = {
    loginHandler: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const { user, token } = userService.loginUser(username, password);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 604800000,
                sameSite: "None",
                secure: true,
            });
            res.status(200).json({
                message: "Login successful",
                user: { username: user.username, role_id: user.role_id },
            });
        } catch (err) {
            next(err);
        }
    },
    logoutHandler: async (req, res) => {
        if (!req.cookies.token) {
            throw new CustomError(400, "No active session was found.");
        }
        console.log(req.cookies.token);
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 604800000,
        });
        res.status(205).send();
    },
    checkLoginHandler: async (req, res) => {
        if (req.user) {
            return res.status(200).json({
                message: "Login authentication successful.",
                user: req.user,
            });
        }
        // status 200 to surpress browser from automatically logging a response with status 4XX or 5XX as an error
        res.status(200).json({ message: "Login authentication failed" });
    },
};
