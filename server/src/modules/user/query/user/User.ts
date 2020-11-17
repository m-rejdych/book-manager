import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Ctx,
  ForbiddenError,
  ID,
} from 'type-graphql';

import UserEntity from '../../../../entity/User';
import Context from '../../../../types/Context';

@Resolver()
class User {
  @Authorized()
  @Query(() => UserEntity)
  async user(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<UserEntity> {
    console.log(ctx);
    if (!ctx.user) throw new ForbiddenError();

    if (!id) {
      const { userId } = ctx.user;
      const user = await UserEntity.findOne(userId);
      if (!user) throw new Error('User not found!');
      return user;
    }

    const user = await UserEntity.findOne(id);
    if (!user) throw new Error('User not found!');

    return user;
  }
}

export default User;
