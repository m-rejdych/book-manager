import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreateBook from './book/mutation/createBook';
import UpdateBook from './book/mutation/updateBook';

const resolvers = [Register, Login, User, CreateBook, UpdateBook] as const;

export default resolvers;
