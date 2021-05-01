import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusType {
    @Field()
    id: string

    @Field()
    status: string
}