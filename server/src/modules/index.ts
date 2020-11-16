import TestResolver from './testResolver';
import Register from './user/mutation/register';

const resolvers = [TestResolver, Register] as const;

export default resolvers;
