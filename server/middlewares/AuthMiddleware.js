import { request, response } from "express"
import jwt from "jsonwebtoken"


export const verifyToken = (request, response, next) => {
    const token = request.cookies.jwt;

    if (!token) {
        return response.status(401).send("You are not authorized");
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            console.log("Token verification error:", err);
            return response.status(403).send("Token is not valid");
        }

        if (!payload.userID) {
            return response.status(400).send("Invalid token payload");
        }

        request.userID = payload.userID;
        next();
    });
};