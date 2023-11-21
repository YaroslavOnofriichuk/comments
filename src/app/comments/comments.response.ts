import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentFile } from 'src/entities/comment/comment-file.entity';
import { User } from 'src/entities/user/user.entity';

export class Comments_Response_User extends PickType(User, [
    'id',
    'name',
    'email',
]) {}

export class Comments_Response_Files extends PickType(CommentFile, [
    'id',
    'url',
]) {}

export class Comments_Response_Child extends PickType(Comment, [
    'id',
    'text',
    'homePage',
    'userId',
    'user',
    'parentId',
    'parent',
    'children',
    'files',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => Comments_Response_Child,
    })
    @Type(() => Comments_Response_Child)
    declare children: Comment[];

    @ApiProperty({
        type: () => Comments_Response_Child,
    })
    @Type(() => Comments_Response_Child)
    declare parrent: Comment;

    @ApiProperty({
        type: () => Comments_Response_User,
    })
    @Type(() => Comments_Response_User)
    declare user: User;

    @ApiProperty({
        type: () => Comments_Response_Files,
    })
    @Type(() => Comments_Response_Files)
    declare files: CommentFile[];
}

export class Comments_Response extends PickType(Comment, [
    'id',
    'text',
    'homePage',
    'userId',
    'user',
    'parentId',
    'parent',
    'children',
    'files',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => Comments_Response_Child,
    })
    @Type(() => Comments_Response_Child)
    declare children: Comment[];

    @ApiProperty({
        type: () => Comments_Response_Child,
    })
    @Type(() => Comments_Response_Child)
    declare parrent: Comment;

    @ApiProperty({
        type: () => Comments_Response_User,
    })
    @Type(() => Comments_Response_User)
    declare user: User;

    @ApiProperty({
        type: () => Comments_Response_Files,
    })
    @Type(() => Comments_Response_Files)
    declare files: CommentFile[];
}

export class Comments_Pagination_Response {
    @ApiProperty({
        description: 'List of comments',
        isArray: true,
    })
    @Expose()
    comments: Array<Comments_Response>;

    @ApiProperty({
        description: 'Total number of comments',
    })
    @Expose()
    totalItems: number;

    @ApiProperty({
        description: 'Total number of pages',
    })
    @Expose()
    totalPages: number;

    @ApiProperty({
        description: 'Current page number',
    })
    @Expose()
    currentPage: number;

    @ApiProperty({
        description: 'Number of comments per page',
    })
    @Expose()
    limit: number;

    @ApiProperty({
        description: 'Previous page number',
        nullable: true,
    })
    @Expose()
    prevPage?: number;

    @ApiProperty({
        description: 'Next page number',
        nullable: true,
    })
    @Expose()
    nextPage?: number;
}
