import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";

@Entity("Users")
// @Unique(['email', 'username'])
export class UserEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;
   
    @Column()
    username: string;

    @Column()
    orders?: string[]

    @Column()
    password: string;

    @Column()
    role: string

   
}