import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreateBook from './book/mutation/createBook';
import UpdateBook from './book/mutation/updateBook';
import DeleteBook from './book/mutation/deleteBook';
import Book from './book/query/book';

const resolvers = [
  Register,
  Login,
  User,
  CreateBook,
  UpdateBook,
  DeleteBook,
  Book,
] as const;

export default resolvers;
