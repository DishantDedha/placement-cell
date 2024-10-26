import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
    // Check for the Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'A token is required for authentication' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

export default verifyToken;