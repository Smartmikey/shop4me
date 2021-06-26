import { Field, Float, ID, Int,  ObjectType,  } from "@nestjs/graphql";
import { StatusType } from "src/order-status/status.type";
import { UserType } from "src/user/user.type";

@ObjectType()
export class orderType {
    @Field(type=> ID)
    id: string

    @Field()
    name: string

    @Field()
    desc: string
    
    @Field( {nullable: true} )
    date?: string

    @Field(type=> Float)
    price: string

    @Field()
    url: string
    
    @Field( {nullable: true})
    status?: string

    @Field(type=> Float, {nullable: true})
    weight?: string

    @Field(type=> Float, {nullable: true})
    shippingFee?: string

    @Field()
    imageUrl: string    

    @Field( {nullable: true})
    payment?: string

    @Field(type=> UserType)
    userId: string


}

@ObjectType()
export class SuccessType {
    @Field()
    message: string
}
