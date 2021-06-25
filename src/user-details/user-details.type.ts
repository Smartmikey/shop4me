import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("UserDetails")
export class UserDetailsType {
    @Field(type=> ID, {nullable: true})
    id?: string

    @Field({nullable: true})
    userId?: string

    @Field({nullable: true})
    firstName?: string

    @Field({nullable: true})
    lastName?: String

    @Field({nullable: true})
    dob?: string

    @Field({nullable: true})
    address?: string

    @Field({nullable: true})
    city?: string
   
    @Field({nullable: true})
    state?: string

    @Field( {nullable: true})
    country?: string

    @Field({nullable: true})
    nearestBusStop?: string
}