import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  providers: [TransactionService, TransactionResolver]
})
export class TransactionModule {}
