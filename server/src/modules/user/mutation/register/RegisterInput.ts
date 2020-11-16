import { Field, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

@InputType()
class RegisterInput {
  @Field()
  @IsEmail(undefined, { message: 'Enter a valid email!' })
  email: string;

  @Field()
  @Matches(/^(?=.*\d).{4,8}$/, {
    message: 'Password must include digital and be at least 4 characters long!',
  })
  password: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;
}

export default RegisterInput;
