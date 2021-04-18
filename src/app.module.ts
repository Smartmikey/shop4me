import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost/shopforme",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [UserEntity]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UserModule,
    AuthModule
  ],
  providers: [Auth],
  
})
export class AppModule {}
