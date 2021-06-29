import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionType } from './transaction.type';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
    ){}

    async createTransaction (): Promise<TransactionType> {
        return
    }
}
