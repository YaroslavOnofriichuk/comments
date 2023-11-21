import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentFile } from 'src/entities/comment/comment-file.entity';
import { FileSevice } from 'src/services/file/file.service';

@Injectable()
export class CommentFilesService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(CommentFile)
        private readonly commentFileRepository: Repository<CommentFile>,
        private readonly fileService: FileSevice,
    ) {}

    async create(
        commentId: number,
        file: Express.Multer.File,
        userId: number,
        baseUrl: string,
    ) {
        if (!file) throw new BadRequestException('File is required');

        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
        });

        if (!comment)
            throw new NotFoundException(
                'Comment with provided commentId is not exists',
            );

        if (comment.userId !== userId)
            throw new ForbiddenException('You have no access to this resource');

        const fileUrl = await this.fileService.upload(file, commentId);

        return await this.commentFileRepository.save({
            commentId,
            url: baseUrl + '/' + fileUrl,
        });
    }

    async findOne(id: number) {
        const file = await this.commentFileRepository.findOne({
            where: { id },
        });

        if (!file) throw new NotFoundException();

        return file;
    }

    async remove(id: number, userId: number) {
        const file = await this.commentFileRepository.findOne({
            where: { id },
            relations: { comment: true },
        });

        if (!file) throw new NotFoundException();

        if (file.comment.userId !== userId) {
            throw new ForbiddenException('You have no access to this resource');
        }

        await this.fileService.remove(file.url);
        await this.commentFileRepository.delete({ id });
        return;
    }
}
