// import jwt from "jsonwebtoken";

import { authUtils } from "../utils/auth-utils.js";

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (token == null) {
        req.user = null;
        return next();
    }

    // jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    //     if (err) {
    //         req.user = null;
    //         return next();
    //     }
    //     req.user = { username: data.user.username, role_id: data.user.role_id };
    //     next();
    // });
    const { err, data } = authUtils.verifyToken(token);

    if (err) {
        req.user = null;
        return next();
    }

    req.user = { username: data.user.username, role_id: data.user.role_id };
    next();
}

export { authenticateToken };
