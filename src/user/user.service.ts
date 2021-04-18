import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { LoginInput, UserInput } from './user.input';
import { Token, UserType } from './user.type';
import * as bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from "../constants";
@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
        ){}

        async createUser (userInput: UserInput): Promise<UserType> {
            const {email, username, password }= userInput
            const lowerCaseEmail = email.toLowerCase()

            const hashedPassword = await  bcrypt.hash(password, 10)

            const user = this.userRepository.create({
                id: uuid(),
                username,
                email: lowerCaseEmail,
                password: hashedPassword,
                role: "user",
                
            })
            return this.userRepository.save(user)
        }

        public async getUserByEmail(email: string): Promise<UserType> {
            return await this.userRepository.findOne({
                email
            })
        }
        public async getUser(id: string): Promise<UserType> {
            return await this.userRepository.findOne({
                id
            })
        }

        // async login(loginDetails: LoginInput): Promise<Token> {
        //     const {username, password} = loginDetails

        //     const user = await this.userRepository.findOne({
        //         username
        //     })

        //     if(!user) throw new Error("Username does not exist")

        //     const valid = await bcrypt.compare(password, user.password)
        //     if(!valid) throw new Error("password is incorrect")
            
        //     const payload = { userId: user.id, jwtSecret };
        //     return {
        //     token: this.jwtService.sign(payload)
        //     };
        // }

        // async
}
