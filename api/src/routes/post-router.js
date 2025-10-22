import { Router } from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { postController } from "../controllers/post-controller.js";

const postRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 10,
    message: "You are sending too many comments, try again later!",
    headers: true,
});

// Default path: /api/posts
postRouter
    .route("/")
    .get(postController.getAllPostsHandler)
    .post(upload.single("cover"), postController.createPostHandler);

postRouter
    .route("/:post_id")
    .put(upload.single("cover"), postController.editPostHandler)
    .delete(postController.deletePostHandler);

postRouter.route("/tags").get(postController.getAllTagsHandler);

postRouter.route("/:post_title").get(postController.getPostByTitleHandler);

postRouter
    .route("/:post_title/comments")
    .get(postController.getCommentsHandler)
    .post(limiter, postController.createCommentHandler);

export { postRouter };
