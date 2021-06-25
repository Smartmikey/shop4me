import { Field, InputType } from "@nestjs/graphql";

@InputType()

export class UserDetailsInput {

    @Field({nullable: true})
    firstName: string

    @Field({nullable: true})
    lastName: String

    @Field({nullable: true})
    dob: string

    @Field({nullable: true})
    address: string

    @Field({nullable: true})
    city: string
   
    @Field({nullable: true})
    state: string

    @Field({nullable: true})
    nearestBusStop: string
}