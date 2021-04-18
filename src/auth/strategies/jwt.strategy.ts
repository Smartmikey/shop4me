import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.type';

import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    validate(validationPayload: { email: string, sub: string }): Promise<UserType | null> {
        return this.userService.getUserByEmail(validationPayload.email);
    }
}