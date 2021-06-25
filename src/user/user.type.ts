import { Field, ID, ObjectType } from "@nestjs/graphql";
import { orderType } from "src/order/order.type";
import { UserDetailsType } from "src/user-details/user-details.type";
import { Stream } from "stream";

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

    @Field(type=> UserDetailsType, {nullable: true})
    userDetails?: string
    
    @Field({nullable: true})
    password?: string;

    @Field()
    role: string

    
}

@ObjectType("token")
export class Token {
    @Field({nullable: true})
    token: string
}

@ObjectType('UserUploadProfilePicType')
export class UserUploadProfilePicType {
    @Field()
    success : boolean;
}


