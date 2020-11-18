import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';
import CreateBook from './book/mutation/createBook';

const resolvers = [Register, Login, User, CreateBook] as const;

export default resolvers;
