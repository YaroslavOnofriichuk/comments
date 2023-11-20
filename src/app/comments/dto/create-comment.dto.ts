import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: "Comment's text",
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    description: "Comment's home page url",
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(256)
  @MinLength(10)
  homePage: string;

  @ApiProperty({
    description: "Comment's parent comment id",
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  parrentId: number;
}
