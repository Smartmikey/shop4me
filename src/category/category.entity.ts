import { Column, Entity, ObjectIdColumn, PrimaryColumn} from "typeorm";

@Entity()

export class CategoryEntity {
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    slug: string

    @Column()
    stores?: string[]

    @Column()
    desc?: string

    @Column()
    imageUrl?: string

}