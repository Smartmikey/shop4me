import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsUrl} from "class-validator";

@InputType()
export class OrderInput {
   
    @Field()
    name: string

    @Field()
    desc: string

    @Field(type=> Float)
    price: string

    @IsUrl()
    @Field()
    url: string
    
    @IsUrl()
    @Field()
    imageUrl: string

    @Field()
    date: string

}

@InputType()
export class updateOrderInput {

    @Field( {nullable: true})
    status?: string

    @Field( {nullable: true})
    payment?: string

    @Field( type=> Float,{nullable: true})
    weight?: string

    @Field(type=> Float, {nullable: true})
    shippingFee?: string

}

@InputType()
export class updateOrderPaymentInput {
   @Field( {nullable: true})
    payment?: string

}