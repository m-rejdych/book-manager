import { makeVar } from '@apollo/client';

interface Book {
  id: string;
  title: string;
  description?: string | null;
  author: string;
  isRead: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  books?: Book[];
}

export const userVar = makeVar<Partial<User> | null>(null);
