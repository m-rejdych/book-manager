import { Resolver, Mutation, Arg } from 'type-graphql';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../../../entity/User';
import LoginInput from './LoginInput';
import LoginResponse from '../register/RegisterResponse';
import { TOKEN_SECRET } from '../../../../config';

@Resolver()
class Login {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') { email, password }: LoginInput,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Wrong email or password!');

    const isEqual = await compare(password, user.password);
    if (!isEqual) throw new Error('Wrong email or password!');

    const token = sign({ userId: user.id }, TOKEN_SECRET as string, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    return { user, token };
  }
}

export default Login;
