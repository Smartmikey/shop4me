import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
    @Field(type => ID)
    id: string;

    @Field()
    email: string;
   
    @Field()
    username: string;

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