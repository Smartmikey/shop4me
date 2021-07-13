import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionInput } from './transaction.input';
import { TransactionType } from './transaction.type';
import { v4 as uuid } from "uuid";
import { SuccessType } from 'src/order/order.type';
@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
    ){}

    async createTransaction (option: TransactionInput): Promise<TransactionType> {
        const transaction = await  this.transactionRepository.create({
            id: uuid(),
            ...option
        })

        return this.transactionRepository.save(transaction)
    }

    async getTransactions (): Promise<TransactionType[]> {
        return await this.transactionRepository.find()
    }
    
    async getTransaction (id: string): Promise<TransactionType> {
        return await this.transactionRepository.findOne({id})
    }

    async deleteTransaction (id: string): Promise<SuccessType> {

        const transaction = await this.transactionRepository.findOne(id)
         this.transactionRepository.remove(transaction)
        return {
            message: "Successfully deleted"
        }

    }
}
