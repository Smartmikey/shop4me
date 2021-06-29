import { Field, InputType, Int } from "@nestjs/graphql";
import { isInt } from "class-validator";

@InputType()

export class UserDetailsInput {

    @Field({nullable: true})
    firstName: string

    @Field({nullable: true})
    lastName: string

    @Field({nullable: true})
    dob: string

    @Field({nullable: true})
    address: string

    @Field(type=> Int, {nullable: true})
    phone: string

    @Field({nullable: true})
    city: string
   
    @Field({nullable: true})
    state: string

    @Field({nullable: true})
    nearestBusStop: string
}