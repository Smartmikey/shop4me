import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CategoryInput {
    @Field()
    name: string
}

@InputType()
export class UpdateCategoryInput {
    @Field()
    id: string 

    @Field()
    name?: string 

}

@InputType()
export class UpdateCategorySlugInput {
    @Field()
    id: string 

    @Field()
    slug?: string 

}

@InputType()
export class addStoreInput {
    @Field()
    id: string

    @Field(type => ID)
    storeId: string
}