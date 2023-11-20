import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class Auth_RefreshDto {
  @ApiProperty({
    description: 'JWT refresh token',
  })
  @IsNotEmpty()
  @IsJWT()
  readonly refreshToken: string;
}
