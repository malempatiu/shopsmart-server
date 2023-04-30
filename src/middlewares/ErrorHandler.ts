import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';

export class ErrorHandler {
  public static handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.status).json({ error: err.message });
    }

    console.log(err);
    return res.status(500).json({ error: 'Something went wrong!' });
  };
}