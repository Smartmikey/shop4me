import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    forwardRef(()=> CategoryModule),
  ],
  providers: [StoreService, StoreResolver],
  exports: [StoreService]
})
export class StoreModule {}
