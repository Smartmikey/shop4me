import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class TransactionInput {

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

    @Field()
    userId: string

    @Field()
    orderId: string
}