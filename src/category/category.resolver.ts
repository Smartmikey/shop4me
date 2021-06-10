import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StoreService } from 'src/store/store.service';
import { CategoryInput, UpdateCategoryInput, UpdateCategorySlugInput } from './Category.input';
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

    @Mutation(returns=> CategoryType)
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

    @ResolveField()
    stores(@Parent() category: CategoryType){
        return this.storeService.storesById(category.stores)
    }

}
