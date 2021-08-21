import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("Status")
export class StatusEntity {
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    status: string
}