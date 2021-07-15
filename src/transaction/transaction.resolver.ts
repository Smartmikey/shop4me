import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderService } from 'src/order/order.service';
import { SuccessType } from 'src/order/order.type';
import { UserService } from 'src/user/user.service';
import { TransactionInput } from './transaction.input';
import { TransactionService } from './transaction.service';
import { TransactionType } from './transaction.type';

@Resolver(of=> TransactionType)
export class TransactionResolver {
    constructor(
        private transactionService: TransactionService,
        private orderService: OrderService,
        private userService: UserService
    ){}

    @Mutation(returns => TransactionType)
    createTransaction(
        @Args("option") option:TransactionInput,
    ){
        return this.transactionService.createTransaction(option)
    }

    @Query(returns => [TransactionType])
    getTransactions (){
        return this.transactionService.getTransactions()
    }

    @Query(returns => TransactionType)
    getTransaction (
        @Args("id") id: string,
    ){
        return this.transactionService.getTransaction(id)
    }

    @Mutation(returns => SuccessType)
    deleteTransaction (
        @Args("id") id: string,
    ){
        return this.transactionService.deleteTransaction(id)
    }

    @Query(returns => Boolean)
    transactionByOrderId(
        @Args("orderId") orderId: string
    ){
        return this.transactionService.TransactionByOrderId(orderId)
    }

    @ResolveField()
    orderId(@Parent() transaction: TransactionType){
        return this.orderService.getOrder(transaction.orderId)
    }
    @ResolveField()
    userId(@Parent() transaction: TransactionType){
        return this.userService.getUser(transaction.userId)
    }
}
