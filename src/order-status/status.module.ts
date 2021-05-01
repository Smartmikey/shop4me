import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { StatusService } from './status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
  providers: [StatusService],
  
})
export class StatusModule {}
