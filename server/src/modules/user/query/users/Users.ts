import { Resolver, Query, Authorized, Ctx, ForbiddenError } from 'type-graphql';

import User from '../../../../entity/User';
import Context from '../../../../types/Context';

@Resolver()
class Users {
  @Authorized()
  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    if (!ctx.user) throw new ForbiddenError();

    const users = await User.find();
    if (!users) throw new Error('Users not found!');

    return users;
  }
}

export default Users;
