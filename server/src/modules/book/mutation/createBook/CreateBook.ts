import { Resolver, Mutation, Authorized, Ctx, Arg } from 'type-graphql';

import Book from '../../../../entity/Book';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import CreateBookInput from './CreateBookInput';
import Context from '../../../../types/Context';

@Resolver()
class CreateBook {
  @Authorized()
  @Mutation(() => Book)
  async createBook(
    @Arg('data')
    { title, description, category, isRead, author }: CreateBookInput,
    @Ctx() ctx: Context,
  ): Promise<Book> {
    if (!ctx.user) throw new Error('User not found!');

    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');

    let categoryInstance = await Category.findOne({ name: category });
    if (!categoryInstance)
      categoryInstance = Category.create({ name: category });

    const book = Book.create({
      title,
      description: description || undefined,
      category: categoryInstance,
      isRead,
      user,
      author,
    });
    await book.save();

    return book;
  }
}

export default CreateBook;
