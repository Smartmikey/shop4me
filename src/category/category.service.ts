import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { addStoreInput, CategoryInput, UpdateCategoryInput, UpdateCategorySlugInput } from './Category.input';
import {v4 as uuid} from "uuid"
import { CategoryType } from './category.types';
import { SuccessType } from 'src/order/order.type';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    ){}

    async createCategory(options: CategoryInput): Promise<CategoryType> {
        const {name, storeId, desc, imageUrl} = options

        const category = await this.categoryRepository.findOne({name})

        if(category) throw new Error("This category name already exist")

        const newCategory =this.categoryRepository.create({
            id: uuid(), 
            name:name.toLowerCase(),
            slug: name.replace(/\s+/g, '-').toLowerCase(),
            stores: storeId,
            imageUrl,
            desc 
        })

        return this.categoryRepository.save(newCategory)
    }

    async deleteCategory(id: string): Promise<SuccessType> {

        const deleteCategories = await this.categoryRepository.findOne({id})

        await this.categoryRepository.remove(deleteCategories)
        return {message: "Sucessfully deleted"}

    }

    async updateCategory(options: UpdateCategoryInput) : Promise<CategoryType> {

        const {id, name} = options
        const category = await this.categoryRepository.findOne({id})
        category.name = name.toLowerCase()

        return this.categoryRepository.save(category)
    }

    async updateCategorySlug(options: UpdateCategorySlugInput) : Promise<CategoryType> {

        const {id, slug} = options
        const category = await this.categoryRepository.findOne({id})
        category.slug = slug.toLowerCase()

        return this.categoryRepository.save(category)
    }

    async getCategories(): Promise<CategoryType[]> {
        return await this.categoryRepository.find()
    }

    // async getCategoriesById(id: string[]): Promise<CategoryType[]> {
    //     return await this.categoryRepository.find({
    //         where: {
    //             id: {
    //                 $in: id
    //             }
    //         }
    //     })
    // }

    async getCategory(id: string): Promise<CategoryType> {
        return await this.categoryRepository.findOne({id})
    }

    async getCategoryByName(slug: string): Promise<CategoryType> {
        return await this.categoryRepository.findOne({slug})
    }

    async updateStore(id: string, options: addStoreInput): Promise<CategoryType> {
        const { storeId} = options
        let category = await this.categoryRepository.findOne({id})

        category.stores = [ ...storeId]

        // category.stores = [...new Set(tempArr)]

        return this.categoryRepository.save(category)
    }

    // async removeStore(CategoryId: string, storeId: string): Promise <CategoryType> {
    //     let category = await this.categoryRepository.findOne({id: CategoryId})

    //     let tempArr = category.stores.filter(e => e != storeId)
    // }
}
