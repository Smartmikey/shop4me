import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserDetailsInput } from './user-details.input';
import { UserDetailsService } from './user-details.service';
import { UserDetailsType } from './user-details.type';

@Resolver(of => UserDetailsType)
export class UserDetailsResolver {
    constructor(
        private userDetailsService: UserDetailsService
    ){}

    @Mutation(returns => UserDetailsType)
    updateUserDetails(
        @Args("userId") userId: string,
        @Args("options", {nullable: true}) options: UserDetailsInput,
    ){
        return this.userDetailsService.updateUserDetails(userId, options)
    }
}
