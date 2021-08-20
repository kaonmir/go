import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserType } from "../../database/user/types";

namespace Express {
  export const authMiddleware = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers["x-access-token"]?.toString() || req.query.token;

    if (!token) {
      res.status(403).json({
        success: false,
        message: "not logged in",
      });
    }

    try {
      const decoded = jwt.verify(token, req.app.get("jwt-secret"));
      req.user = decoded as IUserType;
      req.sample = "anosfd" as string;
      next();
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err,
      });
    }
  };
}

export default Express.authMiddleware;
