import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Req,
} from '@nestjs/common';
import { CommentFilesService } from './comment-files.service';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CommentFiles_Response } from './comment-files.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestType } from 'src/types';
import { multerOptions } from 'src/config';
import { Public } from 'src/services/auth/public';

@Controller('comment-files')
@ApiTags('Comment files')
export class CommentFilesController {
    constructor(private readonly commentFilesService: CommentFilesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: 'Upload comment file',
        summary: 'Upload file',
    })
    @ApiOkResponse({
        type: CommentFiles_Response,
    })
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.CREATED)
    @Post(':commentId/upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Param('commentId') commentId: string,
        @Req() req: RequestType,
    ) {
        const baseUrl = `${req.protocol}://${req.get('Host')}`;
        return this.commentFilesService.create(
            +commentId,
            file,
            +req.userId,
            baseUrl,
        );
    }

    @ApiOperation({
        description: 'Get comment file',
        summary: 'Get file',
    })
    @ApiOkResponse({
        type: CommentFiles_Response,
    })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentFilesService.findOne(+id);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: 'Delete comment file',
        summary: 'Delete file',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestType) {
        return this.commentFilesService.remove(+id, +req.userId);
    }
}
