import { Column, Entity, ObjectIdColumn, PrimaryColumn} from "typeorm";

@Entity()

export class CategoryEntity {
    // @ObjectIdColumn()
    // _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    slug: string

    @Column("text", {array: true, nullable: true})
    stores: string

}