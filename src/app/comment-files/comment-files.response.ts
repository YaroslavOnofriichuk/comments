import { PickType } from '@nestjs/swagger';
import { CommentFile } from 'src/entities/comment/comment-file.entity';

export class CommentFiles_Response extends PickType(CommentFile, [
    'id',
    'commentId',
    'url',
    'createdAt',
    'updatedAt',
]) {}
