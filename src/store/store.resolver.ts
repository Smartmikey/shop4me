import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuccessType } from 'src/order/order.type';
import { storeInput } from './store.input';
import { StoreService } from './store.service';
import { StoreType } from './store.type';

@Resolver(of => StoreType)
export class StoreResolver {
    constructor(
        private storeService: StoreService
    ){}

    @Mutation(returns=> StoreType)
    createStore(
        @Args("options") options: storeInput,
    ) {
        return this.storeService.createstore(options)
    }

    @Mutation(returns=> SuccessType)
    deleteStore(
        @Args("id")id: string) {
        return this. storeService.deletestore(id)
    }


    @Query(returns=> [StoreType])
    getStores(){
        return this.storeService.getStores()
    }

    @Query(returns=> StoreType)
    getstore(
        @Args("id") id: string,
    ){
        return this.storeService.getStore(id)
    }

}
