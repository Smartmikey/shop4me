import { Field, ObjectType } from "@nestjs/graphql"
import { type } from "os"
import { orderType } from "src/order/order.type"
import { UserType } from "src/user/user.type"

@ObjectType()
export class TransactionType {
    
    @Field()
    id: string

    @Field()
    amount: string

    @Field()
    trans_ref: string

    @Field()
    trans_id: string

    @Field()
    flw_ref: string

    @Field()
    userEmail: string

    @Field()
    date: string

    @Field(type=> UserType)
    userId: string

    @Field(type=> orderType)
    orderId: string
}