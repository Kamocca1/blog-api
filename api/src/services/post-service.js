import { commentRepository } from "../repositories/comment-repository.js";
import { postRepository } from "../repositories/post-repository.js";
import CustomError from "../utils/custom-error.js";
import { formatDate } from "../utils/format-Date.js";

export const postService = {
    getAllPosts: async () => {
        const posts = await postRepository.getAllPostsDescIncludeTags();
        if (!posts || posts.length === 0) {
            throw new CustomError(404, "No posts found.");
        }
        posts.forEach((post) => {
            post.created_at = formatDate(post.created_at);
        });
        return posts;
    },
    getPostByTitle: async (title) => {
        const post = await postRepository.getPostByTitleIncludeTags(title);
        if (post == null) {
            throw new CustomError(404, `Post ${title} was not found.`);
        }
        post.created_at = formatDate(post.created_at);
        return post;
    },
    createNewPost: async (user, title, content, file_buffer, tags) => {
        if (!user) {
            throw new CustomError(
                401,
                "You're not authorized to perform this operation."
            );
        }
        if (!title || !content) {
            throw new CustomError(400, "Fields must not be empty.");
        }
        if (user.role != AUTHOR) {
            throw new CustomError(
                403,
                "You're forbidden from performing this operation."
            );
        }
        const post = await postRepository.createPost(
            title,
            content,
            user.id,
            tags
        );
        // After the post is successfuly created, upload the image to the cloud and update post with url
        const image = await uploadImage(file_buffer);
        const updatedPost = await postRepository.updatePostImageUrl(
            post.id,
            image.url
        );
        return updatedPost;
    },
    editPost: async (user, postId, title, content, file_buffer, tags) => {
        if (!user) {
            throw new CustomError(
                401,
                "You're not authorized to perform this operation."
            );
        }
        if (!title || !content) {
            throw new CustomError(400, "Fields must not be empty.");
        }
        if (user.role != AUTHOR) {
            throw new CustomError(
                403,
                "You're forbidden from performing this operation."
            );
        }
        const post = await postRepository.updatePost(
            postId,
            title,
            content,
            user.id,
            tags
        );

        if (file_buffer) {
            const image = await uploadImage(file_buffer);
            const updatedPost = await postRepository.updatePostImageUrl(
                post.id,
                image.url
            );
            return updatedPost;
        } else {
            return post;
        }
    },
    deletePost: async (user, postId) => {
        if (!user) {
            throw new CustomError(
                401,
                "You're not authorized to perform this operation."
            );
        }
        const post = await postRepository.deletePost(postId);
        if (post == null) {
            throw new CustomError(404, `Post ${user.username} was not found.`);
        }
        return post;
    },
    getAllTags: async () => {
        const tags = await postRepository.getAllTags();

        if (tags == null || tags.length === 0) {
            throw new CustomError(404, "Tags not found");
        }
        return tags;
    },
    getAllPostComments: async (title) => {
        const post = await postRepository.getPostByTitle(title);
        if (post == null) {
            throw new CustomError(404, `Post ${title} was not found.`);
        }
        const comments =
            await commentRepository.getAllPostCommentsDescIncludeUser(post.id);

        comments.forEach((comment) => {
            comment.created_at = formatDate(comment.created_at);
        });
        const updatedComments = comments.map((comment) => ({
            ...comment,
            user: comment.user.username,
        }));
        return updatedComments;
    },
    createPostComment: async (content, postId, userId) => {
        const comment = await commentRepository.createPostComment(
            content,
            postId,
            userId
        );
        return comment;
    },
};
