import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/user/user.input';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.type';
import * as bcrypt from 'bcrypt'

import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validate(email: string, password: string): Promise<UserType | null> {
        const user = await this.userService.getUserByEmail(email);
        
        
        if (!user) throw new Error("Email address not found")

        const passwordIsValid = await bcrypt.compare(password, user.password)
        
        return passwordIsValid ? user : null;
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        const userlogin = await this.validate(email, password)

        if(!userlogin) return 
        const payload = {
            email: userlogin.email,
            sub: userlogin.id,

        }

        return {
            token: this.jwtService.sign(payload),
        }
    }

    async verify(token: string): Promise<UserType> {
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })

        const user = await this.userService.getUserByEmail(decoded.email);

        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }
}
