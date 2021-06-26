import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StoreType {
    
    @Field()
    id: string
    
    @Field()
    name: string
    
    @Field()
    url: string
    
    @Field({nullable: true})
    logoUrl?: string

    @Field(type=> [String], {nullable: true})
    categoryIds: String[]

}