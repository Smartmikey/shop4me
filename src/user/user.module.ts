import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecret } from 'src/constants';
import { OrderModule } from 'src/order/order.module';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        JwtModule.register({
            secret: jwtSecret
        }),
        OrderModule
    ],
    providers: [
        UserResolver,
        UserService 
    ],
    exports: [UserService]
})
export class UserModule {}
