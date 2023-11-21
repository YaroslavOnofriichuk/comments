import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentFile } from 'src/entities/comment/comment-file.entity';
import { CommentValidator } from 'src/services/commentValidator';
import { FileSevice } from 'src/services/file';

@Module({
    controllers: [CommentsController],
    providers: [CommentsService, CommentValidator, FileSevice],
    imports: [TypeOrmModule.forFeature([Comment, CommentFile])],
})
export class CommentsModule {}
