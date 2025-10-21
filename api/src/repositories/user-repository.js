// src/repositories/userRepository.js
import { prisma } from "../utils/prisma.js";

export const userRepository = {
    getAllUsers: async () => {
        return await prisma.user.findMany();
    },
    getUserByUsername: async (username) => {
        return await prisma.user.findUnique({
            where: { username },
        });
    },
    createUser: async (username, password) => {
        return await prisma.user.create({
            data: {
                username: username,
                password: password,
                role_id: 1,
            },
        });
    },
};
