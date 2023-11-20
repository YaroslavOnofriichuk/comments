import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CommentFile } from './comment-file.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  homePage: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Comment, { nullable: true })
  parent: Comment;

  @OneToMany(() => Comment, ({ parent }) => parent)
  children: Comment[];

  @OneToMany(() => CommentFile, ({ comment }) => comment)
  files: CommentFile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
