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
import { CategoryModule } from './category/category.module';
import { StoreModule } from './store/store.module';
import { CategoryEntity } from './category/category.entity';
import { StoreEntity } from './store/store.entity';
// import Upload from 'graphql-upload/public/Upload'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost/shopforme",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [UserEntity, OrderEntity, StatusEntity, CategoryEntity, StoreEntity]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      uploads: {
        maxFileSize: 200000000, // 20 MB
        maxFiles: 20,
        maxFieldSize: 200
      },
      
    }),
    UserModule,
    AuthModule,
    OrderModule,
    CategoryModule,
    StoreModule,
  ],
  providers: [Auth],
  
})
export class AppModule {}
