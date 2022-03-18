import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if(!token) return next(createError.Unauthorized());
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET );
        req.userID = decoded.id;
        next();
    } catch (error) {
        return next(createError.Unauthorized());
    }

}