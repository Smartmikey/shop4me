import { Column, Entity, ObjectIdColumn } from "typeorm"

@Entity("Stores")
export class StoreEntity {
    
    @ObjectIdColumn()
    _id: string

    @Column()
    id: string
    
    @Column()
    name: string
    
    @Column()
    url: string
    
    @Column()
    logoUrl: string
    
    // @Column()
    // categoryIds: string[]

}