import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
