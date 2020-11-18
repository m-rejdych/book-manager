import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Book, (book) => book.categories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Book])
  books: Book[];
}

export default Category;
