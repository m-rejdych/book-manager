import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Book from './Book';

@Entity()
@ObjectType()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Book, (book) => book.category, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Book])
  books: Book[];
}

export default Category;
