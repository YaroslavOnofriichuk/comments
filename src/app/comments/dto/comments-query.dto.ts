import { IsOptional, IsIn, IsString } from 'class-validator';

export class GetCommentsDto {
    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;

    @IsOptional()
    @IsIn(['createdAt', 'userName', 'userEmail'])
    sortBy: string;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder: 'ASC' | 'DESC';
}
