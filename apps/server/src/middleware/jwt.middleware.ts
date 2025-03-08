import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      // return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = payload; // 将解码后的用户信息附加到请求对象上
      next();
    } catch (err) {
      throw new HttpException('jwt检验不通过，可以是过期了', HttpStatus.UNAUTHORIZED)
    }
  }
}