import { postService } from "../services/post-service.js";
import { userService } from "../services/user-service.js";
import CustomError from "../utils/custom-error.js";

const postController = {
    getAllPostsHandler: async (req, res, next) => {
        try {
            const posts = postService.getAllPosts();
            res.status(200).json(posts);
        } catch (err) {
            next(err);
        }
    },
    getPostByTitleHandler: async (req, res, next) => {
        try {
            const post = postService.getPostByTitle(req.params.post_title);
            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    },
    createPostHandler: async (req, res, next) => {
        try {
            const user = userService.getUser(req.user.username);
            req.body.tags = JSON.parse(req.body.tags);
            const post = postService.createNewPost(
                user,
                req.body.title,
                req.body.content,
                req.file.buffer,
                req.body.tags
            );
            res.status(201).json({ message: `Post created: ${post}` });
        } catch (err) {
            if (err.code == "P2002") {
                next(
                    new CustomError(
                        409,
                        "A post with this title already exists."
                    )
                );
            }

            next(err);
        }
    },
    editPostHandler: async (req, res, next) => {
        try {
            const user = await userService.getUser(req.user.username);
            req.body.tags = JSON.parse(req.body.tags);
            const post = await postService.editPost(
                user,
                req.params.post_id,
                req.body.title,
                req.body.content,
                req.file.buffer,
                req.body.tags
            );
            res.status(200).json({ message: `Post edited: ${post}` });
        } catch (err) {
            if (err.code == "P2002") {
                next(
                    new CustomError(
                        409,
                        "A post with this title already exists."
                    )
                );
            }

            next(err);
        }
    },
    deletePostHandler: async (req, res, next) => {
        try {
            const user = await userService.getUser(req.user.username);
            const post = await postService.deletePost(user, req.params.post_id);
            res.status(200).json({ message: `Post has been deleted: ${post}` });
        } catch (err) {
            next(err);
        }
    },
    getAllTagsHandler: async (req, res, next) => {
        try {
            const tags = await postService.getAllTags();
            res.status(200).json(tags);
        } catch (err) {
            next(err);
        }
    },
    getCommentsHandler: async (req, res, next) => {
        try {
            const comments = await postService.getAllPostComments(
                req.params.post_title
            );
            return res.status(200).json(comments);
        } catch (err) {
            next(err);
        }
    },
    createCommentHandler: async (req, res, next) => {
        try {
            const user = await userService.getUser(req.body.username);
            const comment = await postService.createPostComment(
                req.body.content,
                req.body.post_id,
                user.id
            );
            return res.status(201).json(comment);
        } catch (err) {
            next(err);
        }
    },
};

export { postController };
