import { verify } from "jsonwebtoken";
import { findById } from "../models/User";

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Extract token
            const decoded = verify(token, process.env.JWT_SECRET);
            req.user = await findById(decoded.id).select("-password"); // Get user from token
            next();
    }   else {
            res.status(401);
            throw new Error("Not authorized");
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Not authorized" });
    }
};

export default { protect };