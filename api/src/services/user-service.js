import { userRepository } from "../repositories/user-repository.js";
import { authUtils } from "../utils/auth-utils.js";
import CustomError from "../utils/custom-error.js";
CustomError;

export const userService = {
    loginUser: async (username, password) => {
        const user = await userRepository.getUserByUsername(username);

        if (!user) {
            throw new CustomError(401, "Invalid username");
        }

        const isValidPassword = await authUtils.isValidPassword(password, user);
        if (!isValidPassword) {
            throw new CustomError(401, "Invalid password");
        }

        const token = authUtils.generateAccessToken({
            username: user.username,
            role_id: user.role_id,
        });
        return { user, token };
    },
    createNewUser: async (username, password) => {
        const hashedPassword = await authUtils.generateHashedPassword(password);
        const user = await userRepository.createUser(username, hashedPassword);
        return user;
    },
    getUser: async (username) => {
        const user = await userRepository.getUserByUsername(username);
        if (user == null) {
            throw new CustomError(
                404,
                `User ${username} was not found on the server.`
            );
        }
        return user;
    },
};
