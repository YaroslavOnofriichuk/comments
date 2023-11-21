import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class CommentFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @ManyToOne(() => Comment)
    comment: Comment;

    @Column({ type: 'text' })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
