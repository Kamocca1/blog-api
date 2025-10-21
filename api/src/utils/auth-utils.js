import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authUtils = {
    generateHashedPassword: async (password) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    },
    isValidPassword: async (password, user) => {
        return await bcrypt.compare(password, user.password);
    },
    generateAccessToken: (user) => {
        return jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
            expiresIn: 604800000,
        });
    },
    verifyToken: (token) => {
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                return err;
            }
            return data;
        });
    },
};
