"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStratgey = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtStratgey extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret12356789',
        });
    }
}
exports.JwtStratgey = JwtStratgey;
//# sourceMappingURL=jwt.strategy.js.map