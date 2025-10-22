import { prisma } from "../utils/prisma.js";

export const commentRepository = {
    getAllPostCommentsDescIncludeUser: async (postId) => {
        return await prisma.comment.findMany({
            where: {
                post_id: postId,
            },
            include: {
                user: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    },
    createPostComment: async (content, postId, userId) => {
        return await prisma.comment.create({
            data: {
                content: content,
                post_id: postId,
                user_id: userId,
            },
        });
    },
};
