import { Field, InputType } from "@nestjs/graphql";
import { IsUrl } from "class-validator";

@InputType()
export class storeInput {
    
    @Field()
    name: string

    @Field()
    @IsUrl()
    url: string

    @IsUrl()
    @Field()
    logoUrl: string

    @Field(type=> [String])
    categoryIds: string[]
}
@InputType()
export class UpdateStoreInput {
    
    @Field( {nullable: true})
    name?: string

    @Field( {nullable: true})
    @IsUrl()
    url?: string

    @IsUrl()
    @Field( {nullable: true})
    logoUrl?: string

    @Field(type => [String], {nullable: true})
    categoryIds: string[]
}