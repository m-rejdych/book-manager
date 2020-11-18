import {
  Resolver,
  Mutation,
  Ctx,
  Authorized,
  Arg,
  ForbiddenError,
} from 'type-graphql';

import UpdateBookInput from './UpdateBookInput';
import Book from '../../../../entity/Book';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import Context from '../../../../types/Context';

@Resolver()
class UpdateBook {
  @Authorized()
  @Mutation(() => Book)
  async updateBook(
    @Arg('data')
    { title, author, description, bookId, category, isRead }: UpdateBookInput,
    @Ctx() ctx: Context,
  ): Promise<Book> {
    if (!ctx.user) throw new ForbiddenError();

    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');

    const book = await Book.findOne(bookId);
    if (!book) throw new Error('Book not found!');

    let categoryInstance = await Category.findOne({ name: category });
    if (!categoryInstance)
      categoryInstance = Category.create({ name: category });

    book.title = title;
    book.author = author;
    book.description = description;
    book.isRead = isRead;
    book.category = categoryInstance;
    await book.save();

    return book;
  }
}

export default UpdateBook;
