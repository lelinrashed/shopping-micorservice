import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

export default authMiddleware;
