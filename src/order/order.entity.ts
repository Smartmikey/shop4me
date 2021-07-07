import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()

export class OrderEntity {
    // @ObjectIdColumn()
    // _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    desc: string

    // nullable date will be removed in production
    @Column({nullable: true})
    date: string
    
    @Column({nullable: true})
    shippingFee: string

    @Column()
    price: string

    @Column()
    url: string
    
    @Column({nullable: true})
    status: string

    @Column({nullable: true})
    weight: string
    
    @Column()
    imageUrl: string

    @Column({nullable: true})
    payment: string

    @Column()
    userId: string

}