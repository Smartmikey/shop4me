import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionInput } from './transaction.input';
import { TransactionType } from './transaction.type';
import { v4 as uuid } from "uuid";
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
}
