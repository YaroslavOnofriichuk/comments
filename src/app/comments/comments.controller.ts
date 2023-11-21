import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Req,
    Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentsDto } from './dto/comments-query.dto';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import {
    Comments_Pagination_Response,
    Comments_Response,
} from './comments.response';
import { RequestType } from 'src/types';
import { Public } from 'src/services/auth/public';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: 'Create comment',
        summary: 'Create',
    })
    @ApiOkResponse({
        type: Comments_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createCommentDto: CreateCommentDto,
        @Req() req: RequestType,
    ) {
        return this.commentsService.create(createCommentDto, +req.userId);
    }

    @ApiOperation({
        description: 'Get all comments',
        summary: 'Get comments',
    })
    @ApiOkResponse({
        type: Comments_Pagination_Response,
    })
    @ApiQuery({
        required: false,
        name: 'page',
        type: 'number',
    })
    @ApiQuery({
        required: false,
        name: 'limit',
        type: 'number',
    })
    @ApiQuery({
        required: false,
        name: 'sortBy',
        enum: ['createdAt', 'userName', 'userEmail'],
    })
    @ApiQuery({
        required: false,
        name: 'sortOrder',
        enum: ['ASC', 'DESC'],
    })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Get()
    findAll(@Query() params: GetCommentsDto) {
        return this.commentsService.findAll(
            params.page,
            params.limit,
            params.sortBy,
            params.sortOrder,
        );
    }

    @ApiOperation({
        description: 'Get one comment by id',
        summary: 'Get comment',
    })
    @ApiOkResponse({
        type: Comments_Response,
    })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentsService.findOne(+id);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: 'Update comment by id',
        summary: 'Update comment',
    })
    @ApiOkResponse({
        type: Comments_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Req() req: RequestType,
    ) {
        return this.commentsService.update(+id, updateCommentDto, +req.userId);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: 'Delete comment by id',
        summary: 'Delete comment',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestType) {
        return this.commentsService.remove(+id, +req.userId);
    }
}
