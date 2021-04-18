import { Args, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from 'src/user/user.input';
import { Token, UserType } from 'src/user/user.type';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ){}


    @Query(returns => Token)
    login(
        @Args("loginInput") loginInput: LoginInput,
    ){
        return this.authService.login(loginInput)
    }

    @Query(returns => UserType)
    verifyUser(
        @Args("token") token: string,
    ){
        return this.authService.verify(token)
    }
}
