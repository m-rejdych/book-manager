import { InputType, Field } from 'type-graphql';

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export default LoginInput;
