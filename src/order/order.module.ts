import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderEntity } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity
    ]),
    forwardRef(()=>UserModule),
    // UserModule
  ],
  providers: [OrderService, OrderResolver],
  exports: [OrderService]
})
export class OrderModule {}
