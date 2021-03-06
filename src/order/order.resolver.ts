import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserDetailsService } from 'src/user-details/user-details.service';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.type';
import { OrderInput, updateOrderInput, updateOrderPaymentInput } from './order.input';
import { OrderService } from './order.service';
import { orderType, SuccessType } from './order.type';

@Resolver(of => orderType)
export class OrderResolver {
    constructor(
        
        private userService: UserService,
        private orderService: OrderService,
        private userDetailsService: UserDetailsService
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
    // query order by ID
    @Query(returns => [orderType])
    getOrderByStatus(
        @Args("status") status: string,  
    ) {
        return  this.orderService.getOrderByStatus(status)
    }

    // update the order status
    @Mutation(returns => orderType)
    @UseGuards(GqlAuthGuard)
    updateOrder(
        @CurrentUser() user: UserType,
        @Args("orderId") orderId: string,
        @Args("options", {nullable: true}) options: updateOrderInput
    ){
        if(user.role !== "admin") throw new Error("You cannot update order status")
        return this.orderService.updateOrder(orderId, options)
    }
  
    @Mutation(returns => orderType)
    @UseGuards(GqlAuthGuard)
    updateOrderPayment(
        @Args("orderId") orderId: string,
        @Args("options", {nullable: true}) options: updateOrderPaymentInput
    ){
        return this.orderService.updateOrderPayment(orderId, options)
    }

    @Mutation(returns => SuccessType)
    @UseGuards(GqlAuthGuard)
    deleteOrder (
        @CurrentUser() user: UserType,
        @Args("id") id: string,

    ){
        if(user.role !== "admin") throw new Error("You cannot update order status")
        return this.orderService.deleteOrder(id)
    }

    // this code resolves the user field of the order schema
    // it works perfectly
    @ResolveField()
    userId(@Parent() order: orderType) {
        return this.userService.getUser(order.userId)
    }
    
}
