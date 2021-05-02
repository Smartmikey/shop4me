import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryType {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    stores: string[]
}