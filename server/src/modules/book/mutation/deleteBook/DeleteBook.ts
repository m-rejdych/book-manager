import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Authorized,
  ID,
  ForbiddenError,
} from 'type-graphql';

import User from '../../../../entity/User';
import Book from '../../../../entity/Book';
import Context from '../../../../types/Context';

@Resolver()
class DeleteBook {
  @Authorized()
  @Mutation(() => ID)
  async deleteBook(
    @Arg('bookId', () => ID) bookId: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    if (!ctx.user) throw new ForbiddenError();

    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');

    const book = await Book.findOne(bookId, {
      loadRelationIds: { relations: ['user'] },
    });
    if (!book) throw new Error('Book not found!');
    if ((book.user as unknown) !== userId) throw new ForbiddenError();
    await book.remove();

    return bookId;
  }
}

export default DeleteBook;
