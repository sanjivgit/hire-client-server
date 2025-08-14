import { NextFunction, Request, Response } from "express";

class UserMiddleware {
    async extractUserId(req: Request, res: Response, next: NextFunction) {
        req.body.userId = req.params.userId;
        next()
    }
}

export default UserMiddleware