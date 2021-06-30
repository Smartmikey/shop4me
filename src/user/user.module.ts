import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecret } from 'src/constants';
import { OrderModule } from 'src/order/order.module';
import { UserDetailsModule } from '../user-details/user-details.module';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: `${3600 * 24 * 14}s` }

        }),
        OrderModule,
        UserDetailsModule
    ],
    providers: [
        UserResolver,
        UserService 
    ],
    exports: [UserService]
})
export class UserModule {}
