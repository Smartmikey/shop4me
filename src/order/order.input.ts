import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrderInput {
   
    @Field()
    name: string

    @Field()
    desc: string

    @Field()
    price: string

    @Field()
    url: string
    
    @Field()
    imageUrl: string

    @Field()
    weight: string

}

@InputType()
export class updateOrderInput {
    @Field()
    orderId: string

    @Field()
    status: string

}