import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionInput } from './transaction.input';
import { TransactionService } from './transaction.service';
import { TransactionType } from './transaction.type';

@Resolver(of=> TransactionType)
export class TransactionResolver {
    constructor(
        private transactionService: TransactionService
    ){}

    @Mutation(returns => TransactionType)
    createTransaction(
        @Args("option") option:TransactionInput,
    ){
        return this.transactionService.createTransaction(option)
    }

    @Query(returns => TransactionType)
    getTransactions (){
        return this.transactionService.getTransactions()
    }

    @Query(returns => TransactionType)
    getTransaction (
        @Args("id") id: string,
    ){
        return this.transactionService.getTransaction(id)
    }

    @Query(returns => TransactionType)
    deleteTransaction (
        @Args("id") id: string,
    ){
        return this.transactionService.deleteTransaction(id)
    }
}
