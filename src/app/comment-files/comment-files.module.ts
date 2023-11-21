import { Module } from '@nestjs/common';
import { CommentFilesService } from './comment-files.service';
import { CommentFilesController } from './comment-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentFile } from 'src/entities/comment/comment-file.entity';
import { FileSevice } from 'src/services/file';

@Module({
    controllers: [CommentFilesController],
    providers: [CommentFilesService, FileSevice],
    imports: [TypeOrmModule.forFeature([Comment, CommentFile])],
})
export class CommentFilesModule {}
