import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Auth_RefreshResponse {
  @ApiProperty({
    description: 'JWT access token',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
  })
  @Expose()
  refreshToken: string;
}
