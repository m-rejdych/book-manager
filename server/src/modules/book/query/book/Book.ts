import {
  Resolver,
  Query,
  Arg,
  ID,
  Authorized,
  Ctx,
  ForbiddenError,
} from 'type-graphql';

import BookEntity from '../../../../entity/Book';
import User from '../../../../entity/User';
import Context from '../../../../types/Context';

@Resolver()
class Book {
  @Authorized()
  @Query(() => BookEntity)
  async book(
    @Arg('bookId', () => ID) bookId: string,
    @Ctx() ctx: Context,
  ): Promise<BookEntity> {
    if (!ctx.user) throw new ForbiddenError();

    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');

    const bookInstance = await BookEntity.findOne(bookId, {
      relations: ['user'],
    });
    if (!bookInstance) throw new Error('Book not found!');

    return bookInstance;
  }
}

export default Book;
