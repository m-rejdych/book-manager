import { makeVar } from '@apollo/client';
import { User } from '../generated/graphql';

export const userVar = makeVar<User | null>(null);
