import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDetailsEntity } from './user-details.entity';
import { UserDetailsInput } from './user-details.input';
import { UserDetailsType } from './user-details.type';
import { v4 as uuid } from "uuid";

@Injectable()
export class UserDetailsService {
    constructor(
        @InjectRepository(userDetailsEntity) private userDetailsRepository: Repository<userDetailsEntity>,
    ){}

    async updateUserDetails(userId, options: UserDetailsInput): Promise<UserDetailsType > {
        let detailsExist = await this.userDetailsRepository.findOne({userId})
            console.log("Options: ",options);
            
                   
            options.firstName != "" && options.firstName != null ? detailsExist.firstName = options.firstName : detailsExist.firstName
            options.lastName != "" && options.lastName != null? detailsExist.lastName = options.lastName : detailsExist.lastName
            options.dob != "" && options.dob != null? detailsExist.dob = options.dob : detailsExist.dob
            options.address != "" && options.address != null? detailsExist.address = options.address : detailsExist.address
            options.city != "" && options.city != null? detailsExist.city = options.city : detailsExist.city
            options.state != "" && options.state != null? detailsExist.state = options.state : detailsExist.state
            options.nearestBusStop != "" && options.nearestBusStop != null? detailsExist.nearestBusStop = options.nearestBusStop : detailsExist.nearestBusStop
    

        return this.userDetailsRepository.save(detailsExist)
    }

    async createUserDetails(userId: string): Promise<UserDetailsType> {
        let details = this.userDetailsRepository.create({
            id: uuid(),
            firstName: " ",
            lastName: "",
            address: "",
            city: "",
            country: "Nigeria",
            state: "",
            dob: "",
            nearestBusStop: "",
            userId
        })

        return this.userDetailsRepository.save(details)
    }
    async getDetailsByUserId(userId: string): Promise<UserDetailsType> {
        return this.userDetailsRepository.findOne({userId})
    } 
}
