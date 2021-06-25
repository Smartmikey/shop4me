import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Token,  UserType, UserUploadProfilePicType } from "./user.type";
import { LoginInput, UserInput } from "./user.input";
import { UserService } from "./user.service";
import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";
import { OrderService } from "src/order/order.service";
import { GraphQLUpload,   } from "apollo-server-express";
// import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { Upload,  } from "graphql-upload";
import { UserDetailsService } from "src/user-details/user-details.service";

@Resolver(of => UserType)
export class UserResolver {
constructor(
    // @Inject(forwardRef(()=> OrderService))
    private userService: UserService,
    private orderService: OrderService,
    private userDetailsService: UserDetailsService
){}
    // create a user
    @Mutation(returns => Token)
    createUser(
        @Args("UserInput") UserInput: UserInput,
    ){
        return this.userService.createUser(UserInput)
    }

    // @Mutation(returns => UserUploadProfilePicType)
    // public async uploadProfilePic(@Args({name: "file", type: () => GraphQLUpload}) 
    // {
    //     createReadStream,
    //     filename
    // }: FileUpload ): Promise<UserUploadProfilePicType> {
    //     return new Promise(async (resolve, reject) => 
    //         createReadStream()
    //             .pipe(createWriteStream(__dirname+` ./uploads/${filename}`))
    //             .on('finish', () => resolve({success: true}))
    //             .on('error', () => reject({success: false}))
    //     );
    // }

    @Mutation(returns => UserUploadProfilePicType)
    uploadProfilePic(@Args({name:'file', type: () => GraphQLUpload}) file: Upload): Promise<UserUploadProfilePicType>{
        // console.log(await file)
        
        const {createReadStream, filename, mimetype, encoding} =  file;
        
        console.log( file)
        
        let stream = createReadStream()
        stream.pipe(createWriteStream(__dirname + ` ../../uploads/${filename}`))
        
        
        return this.userService.uploadUserProfile(filename)
        ///Do something with the fileData
    }

    // query to return a single user
    @Query(returns => UserType)
    getUser(
        @Args("id") id: string,
    ){
        return this.userService.getUser(id)
    }

    // query all the users
    @Query(returns => [UserType])
    getUsers(){
        return this.userService.getUsers()
    }

    
    @ResolveField()
    async orders(@Parent() user: UserType){
        return this.orderService.getManyOrders(user.orders)
    }

    @ResolveField()
    async userDetails(@Parent() user: UserType){
        return this.userDetailsService.getDetailsByUserId(user.id)
    }
}