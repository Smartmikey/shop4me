import { Field, ID, InputType } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@InputType()
export class CategoryInput {
    @Field()
    name: string
    
    @IsArray()
    @Field(type => [String])
    storeId: string[]
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
    
    @Field(type => [String], {nullable: true})
    storeId?: string[]
}