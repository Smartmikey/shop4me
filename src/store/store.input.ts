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

    @Field()
    categoryId: string
}