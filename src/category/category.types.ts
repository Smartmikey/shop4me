import { Field, ObjectType } from "@nestjs/graphql";
import { StoreType } from "src/store/store.type";

@ObjectType()
export class CategoryType {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    slug: string

    @Field(type=> [StoreType], {nullable: true})
    stores?: string[]
}