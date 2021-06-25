import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsResolver } from './user-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userDetailsEntity } from './user-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([userDetailsEntity])
  ],
  providers: [UserDetailsService, UserDetailsResolver],
  exports: [UserDetailsService]
})
export class UserDetailsModule {}
