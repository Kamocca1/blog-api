import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
// import configs from "./configs/index.js";
// import middlewares from "./middlewares/index.js";
// import routers from "./routes/index.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
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

/**
 * -------------- ROUTES ----------------
 */

// Middleware to make current path available to all view templates
// app.use(middlewares.locals.setCommonLocals);
// app.use(routers.authRouter);
// console.log(routers.authRouter);

/**
 * -------------- ERROR HANDLING ----------------
 */

/**
 * -------------- SERVER ----------------
 */

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`File uploader app - listening on port ${PORT}!`);
});
