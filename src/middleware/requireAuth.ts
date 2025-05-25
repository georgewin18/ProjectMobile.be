import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!

export interface AuthenticatedRequest extends Request {
    user?: { id: string }
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json(
            {
                message: 'No token provided'
            }
        )
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, SUPABASE_JWT_SECRET) as any
        req.user = { id: payload.sub }
        next()
    } catch (err) {
        res.status(401).json(
            {
                message: 'Invalid token'
            }
        )        
    }
}