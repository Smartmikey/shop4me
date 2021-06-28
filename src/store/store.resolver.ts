import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoryService } from 'src/category/category.service';
import { SuccessType } from 'src/order/order.type';
import { storeInput, UpdateStoreInput } from './store.input';
import { StoreService } from './store.service';
import { StoreType } from './store.type';


@Resolver(of => StoreType)
export class StoreResolver {
    constructor(
        private storeService: StoreService,
        private categoryService: CategoryService
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
        return this.storeService.deletestore(id)
    }

    @Mutation(returns => StoreType)
    updateStore(
        @Args("id") id:string,
        @Args("options") options:UpdateStoreInput

    ){
        return this.storeService.updatestore(id, options)
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

    @ResolveField()
    async categoryIds(@Parent() store: StoreType){
        return this.categoryService.getCategoriesById(store.categoryIds)
    }

}
