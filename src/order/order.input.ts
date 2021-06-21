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

    

}

@InputType()
export class updateOrderInput {

    @Field()
    status: string

    @Field(type=> Int)
    weight: string

}