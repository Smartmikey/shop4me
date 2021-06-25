import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderEntity } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserDetailsModule } from 'src/user-details/user-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity
    ]),
    forwardRef(()=>UserModule),
    // UserModule
    UserDetailsModule
  ],
  providers: [OrderService, OrderResolver, ],
  exports: [OrderService]
})
export class OrderModule {}
