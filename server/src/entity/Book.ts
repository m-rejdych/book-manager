import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import User from './User';
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

  @Column()
  @Field()
  author: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.books, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Category, (category) => category.books, {
    cascade: ['insert', 'update'],
  })
  @Field(() => Category)
  category: Category;
}

export default Book;
