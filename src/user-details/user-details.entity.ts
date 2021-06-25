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
    lastName: String

    @Column()
    dob: string

    @Column()
    address: string

    @Column()
    city: string
    
    @Column()
    state: string

    @Column()
    country?: string

    @Column()
    nearestBusStop: string
}