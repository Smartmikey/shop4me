import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from './store.entity';
import {v4 as uuid} from "uuid"
import { storeInput } from './store.input';
import { StoreType } from './store.type';
import { CategoryService } from 'src/category/category.service';
import { SuccessType } from 'src/order/order.type';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreEntity) private storeRepository: Repository<StoreEntity>,
        private categoryService:  CategoryService
    ){}

    async createstore(options: storeInput): Promise<StoreType> {
        const {name, url, logoUrl, categoryIds} = options
        
        const store = await this.storeRepository.findOne({where: {name}})
        console.log(store);
        
        if(store) throw new Error("This store name already exist")

        const newstore =this.storeRepository.create({
            id: uuid(), 
            name: name.toLowerCase(),
            url: url.toLowerCase(),
           logoUrl,
           categoryIds
        })

        // this.categoryService.addStore({
        //     id: categoryId,
        //     storeId: newstore.id,
        // })
        return this.storeRepository.save(newstore)
    }

    async deletestore(id: string): Promise<SuccessType> {

        const deleteCategories = await this.storeRepository.findOne({id})

        await this.storeRepository.remove(deleteCategories)
        return {message: "Sucessfully deleted"}

    }

    // async updatestore(options: storeInput) : Promise<StoreType> {

    //     const { name, url, logoUrl} = options

    //     return this.storeRepository.save()
    // }

    async getStores(): Promise<StoreType[]> {
        return await this.storeRepository.find()
    }

    async getStore(id: string): Promise<StoreType> {
        return await this.storeRepository.findOne({id})
    }

    async storesById(id: string[]): Promise<StoreType[]> {
        const stores = this.storeRepository.find({
            where: {
                id: {
                    $in: id
                }
            }
        })

        return stores
    }
}
