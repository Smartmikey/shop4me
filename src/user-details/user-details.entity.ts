import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("userDetails")
export class userDetailsEntity {
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id?: string

    @Column()
    userId?: string
    
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    dob: string

    @Column()
    address: string

    @Column()
    phone: string

    @Column()
    city: string
    
    @Column()
    state: string

    @Column()
    country?: string

    @Column()
    nearestBusStop: string
}