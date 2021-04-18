import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Max, Min } from "class-validator";

@InputType()
export class UserInput {

    @IsEmail()
    @Field()
    email: string;
   
    @Min(3)
    @Max(15)
    @Field()
    username: string;

    @Min(8)
    @Field()
    password: string;
}


@InputType()
export class LoginInput {
        
    @Field()
    email: string;

    @Field()
    password: string;
}
