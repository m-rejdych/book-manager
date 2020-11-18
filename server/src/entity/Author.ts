import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

import Book from './Book';

@Entity()
@ObjectType()
class Author extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  country: string;

  @Field()
  fullName(@Root() parent: Author): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @OneToMany(() => Book, (book) => book.author, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Book])
  books: Book[];
}

export default Author;
