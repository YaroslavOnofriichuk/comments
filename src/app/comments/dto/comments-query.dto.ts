import { IsInt, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCommentsDto {
  @IsInt()
  @IsOptional()
  @Transform((value) => parseInt(value.toString(), 10))
  page: number;

  @IsInt()
  @IsOptional()
  @Transform((value) => parseInt(value.toString(), 10))
  limit: number;

  @IsOptional()
  @IsIn(['createdAt', 'userName', 'userEmail'])
  sortBy: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder: 'ASC' | 'DESC';
}
