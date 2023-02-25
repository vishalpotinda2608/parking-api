import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStratgey extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret12356789', //TODO: add this in env variables
    });
  }
  //   async validate(payload: any) {
  //     // const user = await this.userService.getById(payload.sub);
  //      return {
  //      id:payload.sub,
  //      name: payload.name,
  //      roles: payload.roles
  //     };
  //   }
}
