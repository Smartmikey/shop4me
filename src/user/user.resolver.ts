import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Token, UserType } from "./user.type";
import { LoginInput, UserInput } from "./user.input";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Resolver(of => UserType)
export class UserResolver {
constructor(
    private userService: UserService
){}

    @Mutation(returns => UserType)
    createUser(
        @Args("UserInput") UserInput: UserInput,
    ){
        return this.userService.createUser(UserInput)
    }

    @Query(returns => UserType)
    @UseGuards(GqlAuthGuard)
    getUser(
        @CurrentUser() user: UserType,
        @Args("id") id: string,
    ){
        if(user.role !== "admin") throw new Error("You are not authorized to perform this operation.")
        
        return this.userService.getUser(id)
    }

    // @Query(returns => Token) 
    // login(
    //     @Args("loginDetails") loginDetails: LoginInput,
    // ){
    //     return this.userService.login(loginDetails)
    // }
}