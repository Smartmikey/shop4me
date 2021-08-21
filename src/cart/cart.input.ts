import { Field, Float, InputType } from "@nestjs/graphql";
import { orderStructureType} from "src/order/order.type";

@InputType()
export class CartInput {
    @Field(type => [orderStructureInput])
    products: orderStructureInput[]

    @Field(type=> Float)
    amount: string

}

@InputType()
export class orderStructureInput {
    @Field()
    name: string

    @Field()
    desc: string

    @Field(type=> Float)
    price: string

    @Field()
    url: string

    @Field()
    imageUrl: string    
  
    @Field()
    date: string    

}