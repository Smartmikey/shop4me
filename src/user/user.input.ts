import { Field, InputType } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
import { IsEmail, isNotEmpty, Max, Min } from "class-validator";
// import { Upload } from "../scalars/upload.scalar";
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

// @InputType()
// export class UploadUserProfilePicInput {
//     @Field()
//     @Exclude()
//     file : Upload
// }