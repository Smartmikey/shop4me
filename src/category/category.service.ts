import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { addStoreInput, CategoryInput, UpdateCategoryInput, UpdateCategorySlugInput } from './Category.input';
import {v4 as uuid} from "uuid"
import { CategoryType } from './category.types';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    ){}

    async createCategory(options: CategoryInput): Promise<CategoryType> {
        const {name} = options

        const category = await this.categoryRepository.findOne({name})

        if(category) throw new Error("This category name already exist")

        const newCategory =this.categoryRepository.create({
            id: uuid(), 
            name:name.toLowerCase(),
            slug: name.replace(/\s+/g, '-').toLowerCase(),
            stores: []
        })

        return this.categoryRepository.save(newCategory)
    }

    async deleteCategory(id: string): Promise<string> {

        const deleteCategories = await this.categoryRepository.findOne({id})

        await this.categoryRepository.remove(deleteCategories)
        return "Sucessfully deleted"

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

    async getCategory(id: string): Promise<CategoryType> {
        return await this.categoryRepository.findOne({id})
    }

    async addStore(options: addStoreInput): Promise<CategoryType> {
        const {id, storeId} = options
        const category = await this.categoryRepository.findOne({id})

        category.stores = [...category.stores, storeId]

        return this.categoryRepository.save(category)
    }
}
