import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    StoreModule
  ],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService]
})
export class CategoryModule {}
