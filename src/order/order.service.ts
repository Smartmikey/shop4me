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

    async createOrder(user, options: OrderInput) : Promise<orderType> {
        const {desc, name, url, weight, price, imageUrl} = options
        const order = this.orderRepository.create({
            id: UUID(),
            desc,
            name,
            url,
            weight,
            imageUrl,
            price,
            userId: user.id,
            status: "processing"

        })

        this.userService.addOrder(user.id, order.id)
        
        return this.orderRepository.save(order)
    }

    
    async getOrders(): Promise<orderType[]>{
        return await this.orderRepository.find()
    }

    async getOrder(id: string) : Promise<orderType> {
        return await this.orderRepository.findOne({id})
    }

    async getManyOrders(orderId: string[]): Promise<orderType[]>{
        return  this.orderRepository.find({
            where: {
                id: {
                    $in: orderId
                }
            }
        })

        
    }
    async updateOrderStatus(options: updateOrderInput) {
        const {orderId, status} = options

        const order = await this.orderRepository.findOne({id:orderId})

        order.status = status

        return this.orderRepository.save(order)
    }
}
