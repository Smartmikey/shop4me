import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserInput } from './user.input';
import { UserType, UserUploadProfilePicType } from './user.type';
import * as bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { JwtService } from '@nestjs/jwt';
import { OrderService } from 'src/order/order.service';
import { UserDetailsService } from 'src/user-details/user-details.service';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private userDetailsService: UserDetailsService
        ){}

        // this create a user
        async createUser (userInput: UserInput): Promise<{token: string}> {
            // let { }= userInput
            const lowerCaseEmail = userInput.email.toLowerCase()

            // hashing the password
            const hashedPassword = await  bcrypt.hash(userInput.password, 10)

            const user = await this.userRepository.create({
                id: uuid(),
                username: userInput.username,
                email: lowerCaseEmail,
                password: hashedPassword,
                role: "user",
                orders: [],
                
                
            })

            this.userDetailsService.createUserDetails(user.id)
            this.userRepository.save(user)

            // extracting hashed password so i dont return it in the query
           const {password, ...result} = user
           const payload = {
            email: user.email,
            sub: user.id,

            }

            return {
                token: this.jwtService .sign(payload),
            }
        }

        // this function query a user by email
         async getUserByEmail(email: string): Promise<UserType> {
            return await this.userRepository.findOne({
                email
            })
        }

        // // this function query a user by id
         async getUser(id: string): Promise<UserType> {
            return await this.userRepository.findOne({
                id
            })
        }

        // query all users
        async getUsers(): Promise<UserType[]> {
            return await this.userRepository.find()
        }

        // I used this function in the order.service to attach the order Id
        // to the user who made the order, so i get the userId and the order Id
        async addOrder(userId:string, orderId: string): Promise<UserType> {
            const userOrder = await this.getUser(userId)

            userOrder.orders =[...userOrder.orders, orderId]
            return this.userRepository.save(userOrder)
        }

        async uploadUserProfile(file: {}): Promise<UserUploadProfilePicType> {
            // const {createReadStream, } = file
            return {
                success: true
            }
            
        }
        
}
