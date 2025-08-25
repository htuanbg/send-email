// File: src/middleware/cors.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;
    
    // Danh sách domains được phép
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://www.ngoctinhsolar.site',
      'https://ngoctinhsolar.site'
    ];

    // Kiểm tra origin
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin'
    );

    // Xử lý preflight request
    if (req.method === 'OPTIONS') {
      res.status(204).send();
      return;
    }

    next();
  }
}