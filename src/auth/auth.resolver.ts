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
        @Args("email") email: string, 
        @Args("password") password: string,
    ){
        return this.authService.login(email, password)
    }

    @Query(returns => UserType)
    verifyUser(
        @Args("token", {nullable: true}) token: string,
    ){
        return this.authService.verify(token)
    }
}
