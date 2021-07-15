import { Field, ObjectType } from "@nestjs/graphql";
import { CategoryType } from "src/category/category.types";

@ObjectType()
export class StoreType {
    
    @Field()
    id: string
    
    @Field({nullable: true})
    name: string
    
    @Field({nullable: true})
    url: string
    
    @Field({nullable: true})
    logoUrl?: string

    // @Field(type=> [CategoryType] ,{nullable: true})
    // categoryIds: string[]

}