import { Args,Query, Mutation, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from 'src/order/order.service';
import { CartInput } from './cart.input';
import { CartService } from './cart.service';
import { CartType } from './cart.types';

@Resolver(of => CartType)
export class CartResolver {
    constructor(
        private cartService: CartService,
        private orderService: OrderService
    ){}

    @Mutation(returns => CartType)
    addCartOrder(
        @Args("options") options: CartInput,
        @Args("user") user: string,
    ){
        return this.cartService.addCartOrder(user, options)
    }

    @Query(returns => CartType)
    getCart(
        @Args("id") id:string 
    ){
        return this.cartService.getCart(id)
    }
    @Query(returns => [CartType])
    getCarts(){
        return this.cartService.getCarts()
    }

    @ResolveField()
    products(@Parent() cart: CartType){
        return this.orderService.getManyOrders(cart.products)
    }

}
