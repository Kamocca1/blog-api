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
    .get(postController.getAllPosts)
    .post(upload.single("cover"), postController.createPost);

postRouter
    .route("/:post_id")
    .put(upload.single("cover"), postController.editPost)
    .delete(postController.deletePost);

postRouter.route("/tags").get(postController.getAllTags);

postRouter.route("/:post_title").get(postController.getPostByTitle);

postRouter
    .route("/:post_title/comments")
    .get(postController.getComments)
    .post(limiter, postController.createComment);

export { postRouter };
