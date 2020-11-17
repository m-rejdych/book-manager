import { AuthChecker } from 'type-graphql';

import Context from '../types/Context';
import User from '../entity/User';

const authChecker: AuthChecker<Context> = async ({ context }) => {
  if (!context.user) return false;
  const { userId } = context.user;
  if (!userId) return false;
  const user = await User.findOne(userId);
  if (!user) return false;
  return true;
};

export default authChecker;
