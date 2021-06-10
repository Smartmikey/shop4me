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
    // create a user
    @Mutation(returns => UserType)
    createUser(
        @Args("UserInput") UserInput: UserInput,
    ){
        return this.userService.createUser(UserInput)
    }

    // query to return a single user
    @Query(returns => UserType)
    getUser(
        @Args("id") id: string,
    ){
        return this.userService.getUser(id)
    }

    // query all the users
    @Query(returns => [UserType])
    getUsers(){
        return this.userService.getUsers()
    }

    // to resolve the order field of the user type.(currently not returning the data
    // even though the data is being returned by the order.service where the function is. 
    // I'm hoping its a problem with the circular dependency)
    @ResolveField()
    async orders(@Parent() user: UserType){
        return this.orderService.getManyOrders(user.orders)
    }
}