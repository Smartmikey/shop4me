import { Field, ObjectType } from "@nestjs/graphql";
import { orderType } from "src/order/order.type";
import { UserType } from "src/user/user.type";

@ObjectType()
export class CartType {
    @Field()
    id: string

    @Field(type=> [orderType])
    products: string[]

    @Field()
    date: string

    @Field()
    amount: string

    @Field(type=> UserType)
    user: string

}