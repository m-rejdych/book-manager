import Register from './user/mutation/register';
import Login from './user/mutation/login';
import User from './user/query/user';

const resolvers = [Register, Login, User] as const;

export default resolvers;
