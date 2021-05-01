import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.type';
import { OrderInput, updateOrderInput } from './order.input';
import { OrderService } from './order.service';
import { orderType } from './order.type';

@Resolver(of => orderType)
export class OrderResolver {
    constructor(
        
        private userService: UserService,
        private orderService: OrderService,
    ){}

    // create order
    @Mutation(returns => orderType)
    @UseGuards(GqlAuthGuard)
    createOrder( 
          @CurrentUser() user: UserType,
        @Args("options") options: OrderInput,
    ){
        return this.orderService.createOrder(user, options)
    }

    // Query all order
    @Query(returns => [orderType])
    getOrders(){
        return this.orderService.getOrders()
    }

    // query order by ID
    @Query(returns => orderType)
    getOrder(
        @Args("id") id: string
    ) {
        return  this.orderService.getOrder(id)
    }

    // update the order status
    @Mutation(returns => orderType)
    @UseGuards(GqlAuthGuard)
    updateOrderStatus(
        @CurrentUser() user: UserType,
        @Args("options") options: updateOrderInput
    ){
        if(user.role !== "admin") throw new Error("You cannot update order status")
        return this.orderService.updateOrderStatus(options)
    }

    // this code resolves the user field of the order schema
    // it works perfectly
    @ResolveField()
    userId(@Parent() order: orderType) {
        return this.userService.getUser(order.userId)
    }

    
}
