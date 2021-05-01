import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/order.entity';
import { StatusEntity } from './order-status/status.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost/shopforme",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [UserEntity, OrderEntity, StatusEntity]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UserModule,
    AuthModule,
    OrderModule,
  ],
  providers: [Auth],
  
})
export class AppModule {}
