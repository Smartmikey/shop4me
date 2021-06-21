import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderInput, updateOrderInput } from './order.input';
import { orderType } from './order.type';
import {v4 as UUID} from 'uuid'
import { UserService } from 'src/user/user.service';



@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @Inject (forwardRef(()=> UserService))
        private userService: UserService
        
    ){}

    // create an order
    async createOrder(user, options: OrderInput) : Promise<orderType> {
        const {desc, name, url, price, imageUrl} = options
        const order = this.orderRepository.create({
            id: UUID(),
            desc,
            name,
            url,
            imageUrl,
            price,
            userId: user.id,
            status: "processing"

        })

        // adding the order ID to the user who made the order
        this.userService.addOrder(user.id, order.id)
        
        return this.orderRepository.save(order)
    }

    // Query all orders
    async getOrders(): Promise<orderType[]>{
        return await this.orderRepository.find()
    }

    // get order by ID
    async getOrder(id: string) : Promise<orderType> {
        return await this.orderRepository.findOne({id})
    }

    // this function is used in the user.resolver file. it's supposed to 
    // return the orders a user made. even though it logs out well here, it still 
    //  the result isn't pushed to the user.resolver file, so it's returning error
    async getManyOrders(orderId: string[]): Promise<orderType[]>{
        return  this.orderRepository.find({
            where: {
                id: {
                    $in: orderId
                }
            }
        })

        
    }

    // this function helps the admin update the status of the order
    // I'll change this to enum later, but need to get everything working first
    async updateOrderStatus(orderId: string, options: updateOrderInput) {
        const {status} = options

        const order = await this.orderRepository.findOne({id:orderId})

        order.status = status

        return this.orderRepository.save(order)
    }
}
