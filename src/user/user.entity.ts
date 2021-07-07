import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";

@Entity()
// @Unique(['email', 'username'])
export class UserEntity {
    // @ObjectIdColumn()
    // _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;
   
    @Column() 
    username: string;

    @Column("text", {array: true})
    orders: string

    @Column()
    password: string;

    @Column()
    role: string

   
}