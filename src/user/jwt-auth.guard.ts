// import { Injectable } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt'){
//     constructor(){
//         super();
//     }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //auth guard Request from header token

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.header('Authorization') === undefined || null) {
      return false;
    }
    let user_token: any = request.header('Authorization');
    console.log('header1', user_token);
    const jwt = require('jsonwebtoken');
    try {
      let decode: any = jwt.verify(user_token, 'secret12356789');
      console.log('decode', decode);
      return true;
    } catch (e) {
      return false;
    }
  }
}
