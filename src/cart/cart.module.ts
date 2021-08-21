import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { OrderModule } from 'src/order/order.module';
import { OrderEntity } from 'src/order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, OrderEntity]),
    forwardRef(()=> OrderModule)
  ],
  providers: [CartService, CartResolver]
})
export class CartModule {}
