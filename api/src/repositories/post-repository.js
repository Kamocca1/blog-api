import { prisma } from "../utils/prisma.js";

export const postRepository = {
    getAllPostsDescIncludeTags: async () => {
        return await prisma.post.findMany({
            include: {
                tags: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    },
    getPostByTitleIncludeTags: async (title) => {
        return await prisma.post.findUnique({
            where: {
                title: title,
            },
            include: {
                tags: true,
            },
        });
    },
    createPost: async (title, content, userId, tags) => {
        return await prisma.post.create({
            data: {
                title: title,
                content: content,
                cover_url: "asd",
                user_id: userId,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { name: tag.name },
                        create: { name: tag.name },
                    })),
                },
            },
        });
    },
    updatePostImageUrl: async (postId, imageUrl) => {
        return await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                cover_url: imageUrl,
            },
        });
    },
    updatePost: async (postId, title, content, userId, tags) => {
        return await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title: title,
                content: content,
                user_id: userId,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { name: tag.name },
                        create: { name: tag.name },
                    })),
                },
            },
        });
    },
    deletePost: async (postId) => {
        return prisma.post.delete({
            where: {
                id: Number(postId),
            },
        });
    },
    getAllTags: async () => {
        return await prisma.tag.findMany();
    },
    getPostByTitle: async (title) => {
        return await prisma.post.findUnique({
            where: {
                title: title,
            },
        });
    },
};
