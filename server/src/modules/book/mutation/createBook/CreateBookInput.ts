import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsBoolean } from 'class-validator';

@InputType()
class CreateBookInput {
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

export default CreateBookInput;
