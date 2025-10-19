import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;
}
