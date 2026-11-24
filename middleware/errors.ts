import type { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
}

type ErrorLike = {
  type?: string; 
  status?: number; 
  code?: string; 
  message?: string;
};

export function errorHandler(err: ErrorLike, req: Request, res: Response, next: NextFunction) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON' });
  }
  console.error('Error:', err.code ?? '', err.message);
  res.status(err.status ?? 500).json({ error: 'Something went wrong on the server' });
}