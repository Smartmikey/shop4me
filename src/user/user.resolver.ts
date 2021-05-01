import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Token, UserType } from "./user.type";
import { LoginInput, UserInput } from "./user.input";
import { UserService } from "./user.service";
import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";
import { OrderService } from "src/order/order.service";

@Resolver(of => UserType)
export class UserResolver {
constructor(
    // @Inject(forwardRef(()=> OrderService))
    private userService: UserService,
    private orderService: OrderService
){}

    @Mutation(returns => UserType)
    createUser(
        @Args("UserInput") UserInput: UserInput,
    ){
        return this.userService.createUser(UserInput)
    }

    @Query(returns => UserType)
    getUser(
        @Args("id") id: string,
    ){
        return this.userService.getUser(id)
    }

    @Query(returns => [UserType])
    getUsers(){
        return this.userService.getUsers()
    }

    @ResolveField()
    async orders(@Parent() user: UserType){
        return this.orderService.getManyOrders(user.orders)
    }
}