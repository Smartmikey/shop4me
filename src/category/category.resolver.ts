import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SuccessType } from 'src/order/order.type';
import { StoreService } from 'src/store/store.service';
import { StoreType } from 'src/store/store.type';
import { addStoreInput, CategoryInput, UpdateCategoryInput, UpdateCategorySlugInput } from './Category.input';
import { CategoryService } from './category.service';
import { CategoryType } from './category.types';

@Resolver(of => CategoryType)
export class CategoryResolver {
    constructor(
        private categoryService:CategoryService,
        private storeService: StoreService
    ){}

    @Mutation(returns=> CategoryType)
    createCategory(
        @Args("options") options: CategoryInput,
    ) {
        return this.categoryService.createCategory(options)
    }

    @Mutation(returns=> SuccessType)
    deleteCategory(
        @Args("id")id: string) {
        return this. categoryService.deleteCategory(id)
    }

    @Mutation(returns=> CategoryType)
    updateCategory(
        @Args("options") options: UpdateCategoryInput, 
    ){
        return this.categoryService.updateCategory(options)
    }
    
    @Mutation(returns=> CategoryType)
    updateCategorySlug(
        @Args("options") options: UpdateCategorySlugInput, 
    ){
        return this.categoryService.updateCategory(options)
    }

    @Query(returns=> [CategoryType])
    getCategories(){
        return this.categoryService.getCategories()
    }

    @Query(returns=> CategoryType)
    getCategory(
        @Args("id") id: string,
    ){
        return this.categoryService.getCategory(id)
    }

    @Mutation(returns => CategoryType)
    updateCategoryStore(
        @Args("id") id: string,
        @Args("options", {nullable: true}) options: addStoreInput
    ){
        return this.categoryService.updateStore(id, options)
    }

    @ResolveField()
    async stores(@Parent() category: CategoryType){
        return this.storeService.getStoresById(category.stores)
    }

}
