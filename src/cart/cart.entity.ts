import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("Cart")
export class CartEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string

    @Column('text', {array: true})
    products: string[]

    @Column()
    date: string

    @Column()
    amount: string

    @Column()
    user: string
}