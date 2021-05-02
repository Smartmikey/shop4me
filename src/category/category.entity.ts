import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()

export class CategoryEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    stores: string[]

}