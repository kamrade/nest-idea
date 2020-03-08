import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if (!request.headers.authorization) {
      return false;
    }

    request.user =  await this.validateToken(request.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const token = auth.split(' ')[1];

    try {
      
      // TODO: check is it async
      // As I checked here is no reason to use await. It works correctly
      // without it. But as I know verify is async function
      // so I keept it here.
      
      const decoded = await jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch(err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
    
  }
}
