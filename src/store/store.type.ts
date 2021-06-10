import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StoreType {
    
    @Field()
    id: string
    
    @Field()
    name: string
    
    @Field()
    url: string
    
    @Field()
    logoUrl: string

}