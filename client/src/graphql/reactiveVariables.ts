import { makeVar } from '@apollo/client';
import { User } from '../generated/graphql';

export const userVar = makeVar<Partial<User> | null>(null);
