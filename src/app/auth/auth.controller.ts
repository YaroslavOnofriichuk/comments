import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth_LoginDto } from './dto/auth-login.dto';
import { Auth_LoginResponse } from './responses/auth-login.response';
import { Auth_RegisterDto } from './dto/auth-register.dto';
import { Auth_UserResponse } from './responses/user.response';
import { Auth_RefreshResponse } from './responses/auth-refresh.response';
import { Auth_RefreshDto } from './dto/auth-refresh.dto';
import { Public } from 'src/services/auth/public';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Sign in with email and password',
    summary: 'Sign in',
  })
  @ApiOkResponse({
    type: Auth_LoginResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() dto: Auth_LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({
    description: 'Sign up',
    summary: 'Sign up',
  })
  @ApiOkResponse({
    type: Auth_UserResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  register(@Body() dto: Auth_RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    description: 'Refreshes JWT access token with refresh token',
    summary: 'Refresh JWT access token',
  })
  @ApiOkResponse({
    type: Auth_RefreshResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  refresh(@Body() dto: Auth_RefreshDto) {
    return this.authService.refresh(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Currently authorized user',
    description: 'Retrieve information about currently authorized user',
  })
  @ApiOkResponse({
    type: Auth_UserResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('user')
  async user(@Req() req: any) {
    return this.authService.user(req.userId);
  }
}
