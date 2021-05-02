import { Field, ID, ObjectType } from "@nestjs/graphql";
import { orderType } from "src/order/order.type";

@ObjectType("User")
export class UserType {
    @Field(type => ID)
    id: string;

    @Field()
    email: string;
   
    @Field()
    username: string;


    @Field(type=> [orderType], {nullable: true})
    orders?: string[]

    @Field({nullable: true})
    password?: string;

    @Field()
    role: string
}

@ObjectType("token")
export class Token {
    @Field()
    token: string
}