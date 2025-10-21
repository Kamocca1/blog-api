import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authenticateToken } from "./middlewares/authenticateToken.js";
import { authRouter } from "./routes/auth-router.js";
// import configs from "./configs/index.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    headers: true,
});
app.use(limiter);

app.use(
    cors(/*{
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }*/)
);

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * -------------- EXPRESS SESSION SETUP ----------------
 */

// app.use(configs.sessionConfig);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// app.use(configs.passport.initialize());
// app.use(configs.passport.session());
app.use(authenticateToken);

/**
 * -------------- ROUTES ----------------
 */

// app.use("/api/posts", postsRouter);
// app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

/**
 * -------------- ERROR HANDLING ----------------
 */

app.use((err, req, res, next) => {
    console.error(`ERROR: ${req.method} ${req.url}`, {
        user: req.user ? req.user.username : "Unauthenticated user",
        body: req.body,
        error: err.stack,
    });
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode || 500,
        message: err.message || "Internal server error",
    });
});

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`File uploader app - listening on port ${PORT}!`);
});
