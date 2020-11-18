import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import User from './User';
import Author from './Author';
import Category from './Category';

@Entity()
@ObjectType()
class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @ManyToOne(() => User, (user) => user.books, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Author, (author) => author.books, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Author)
  author: Author;

  @ManyToMany(() => Category, (category) => category.books, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Category])
  categories: Category[];
}

export default Book;
