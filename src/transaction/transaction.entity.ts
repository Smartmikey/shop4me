import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class TransactionEntity {
    @ObjectIdColumn()
    _id: string
    
    @PrimaryColumn()
    id: string

    @Column()
    amount: string

    @Column()
    trans_ref: string

    @Column()
    trans_id: string

    @Column()
    flw_ref: string

    @Column()
    userEmail: string

    @Column()
    date: string
    
    @Column()
    userId: string
    
    @Column()
    orderId: string
}