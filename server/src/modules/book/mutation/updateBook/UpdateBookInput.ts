import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';

@InputType()
class UpdateBookInput {
  @Field(() => ID)
  @IsUUID(4, { message: 'Wrong book id!' })
  bookId: string;

  @Field()
  @IsNotEmpty({ message: 'Title can not be empty!' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Author must be specified!' })
  author: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  @IsBoolean()
  isRead: boolean;

  @Field()
  @IsNotEmpty({ message: 'Category can not be empty!' })
  category: string;
}

export default UpdateBookInput;
