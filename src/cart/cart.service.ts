import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartInput } from './cart.input';
import { CartType } from './cart.types';
import {v4 as uuid} from 'uuid'
import { OrderEntity } from 'src/order/order.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>,
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        private orderService: OrderService
    ){}

    async addCartOrder(user: string, options: CartInput): Promise<CartType> {
        let products=[]
        const date = new Date().toLocaleDateString()
        options.products.forEach( e => {

            const order = this.orderRepository.create({
                id: uuid(),
                ...e,
                userId: user,
                status: "processing",
                payment: "not paid",
    
            })
            // let singleProduct = await this.orderService.createOrderForCart(user, e)
            console.log( e );
            console.log("............");
            products.push(order.id)
            // console.log("inner : ",products);
            this.orderRepository.save(order)
            
            
        })
        let cart =  await this.cartRepository.create({
            id: uuid(),
            products,
            amount: options.amount,
            date,
            user
        })
        // console.log(products)
        return this.cartRepository.save(cart)
    }

    async getCarts(): Promise<CartType[]> {
        return await this.cartRepository.find()
    } 

    async getCart(id: string): Promise<CartType> {
        return await this.cartRepository.findOne({id})
    } 
}
