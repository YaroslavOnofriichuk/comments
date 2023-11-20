import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentValidator } from 'src/services/commentValidator';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentValidator],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}
