import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment/comment.entity';
import { CommentValidator } from 'src/services/commentValidator';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly commentValidator: CommentValidator,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    if (!this.commentValidator.validate(createCommentDto.text)) {
      throw new BadRequestException(
        'Invalid HTML tags or structure in the comment text',
      );
    }
    return await this.commentRepository.save({
      ...createCommentDto,
      userId,
    });
  }

  async findAll(
    page = 1,
    limit = 25,
    sortBy = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    const qb = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.files', 'files')
      .where('comment.parentId IS NULL');

    let currentPage = page;
    const totalItems = await qb.getCount();
    const totalPages = Math.ceil(totalItems / limit);
    if (currentPage > totalPages) currentPage = 1;
    const paginationSkip = (currentPage - 1) * limit;

    qb.skip(paginationSkip);
    qb.take(limit);

    if (sortBy === 'userName') {
      qb.orderBy({ 'user.name': sortOrder });
    } else if (sortBy === 'userEmail') {
      qb.orderBy({ 'user.email': sortOrder });
    } else {
      qb.orderBy({ 'comment.createdAt': sortOrder });
    }

    const comments = await qb.getMany();
    const commentsWithChildren: Comment[] = [];

    for (const comment of comments) {
      const children = await this.getCommentChildren(comment);
      commentsWithChildren.push({
        ...comment,
        children,
      });
    }

    return {
      comments: commentsWithChildren,
      currentPage,
      limit,
      totalItems,
      totalPages,
      nextPage: totalPages - currentPage > 0 ? currentPage + 1 : null,
      prevPage: currentPage > 1 && totalPages > 1 ? currentPage - 1 : null,
    };
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true, files: true },
    });

    if (!comment) throw new NotFoundException();

    const children = await this.getCommentChildren(comment);
    return {
      ...comment,
      children,
    };
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) throw new NotFoundException();

    if (comment.userId !== userId) throw new ForbiddenException();

    if (
      updateCommentDto.text &&
      !this.commentValidator.validate(updateCommentDto.text)
    ) {
      throw new BadRequestException(
        'Invalid HTML tags or structure in the comment text',
      );
    }

    await this.commentRepository.update(id, updateCommentDto);

    return await this.commentRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) throw new NotFoundException();

    if (comment.userId !== userId) throw new ForbiddenException();

    await this.commentRepository.delete({ id });
  }

  async getCommentChildren(comment: Comment): Promise<Comment[]> {
    const commentChildren: Comment[] = await this.commentRepository.find({
      where: { parentId: comment.id },
      relations: { user: true, files: true },
    });

    const children: Comment[] = [];

    for (const child of commentChildren) {
      const childChildren = await this.getCommentChildren(child);
      children.push({
        ...child,
        children: childChildren,
      });
    }

    return children;
  }
}
