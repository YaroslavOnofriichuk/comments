import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth_LoginDto } from './dto/auth-login.dto';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth_RegisterDto } from './dto/auth-register.dto';
import { Auth_RefreshDto } from './dto/auth-refresh.dto';
import { jwtConfig } from 'src/config';
import { Auth_UserResponse } from './responses/user.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register({ email, password, name }: Auth_RegisterDto) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where(`LOWER("User"."email") = LOWER(:email)`, { email })
      .getOne();

    if (user)
      throw new BadRequestException('User with provided email already exists');

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return await this.userRepository.save({
      email,
      name,
      password: hash,
    });
  }

  async login({ email, password }: Auth_LoginDto) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where(`LOWER("User"."email") = LOWER(:email)`, { email })
      .getOne();

    if (!user) throw new BadRequestException('Wrong email or password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new BadRequestException('Wrong email or password');

    const payload = { id: user.id, name: user.name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, jwtConfig.access),
      this.jwtService.signAsync(payload, jwtConfig.refresh),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh({ refreshToken: _refreshToken }: Auth_RefreshDto) {
    const payload = await this.jwtService
      .verifyAsync(_refreshToken, jwtConfig.refresh)
      .catch(() => {
        throw new BadRequestException('Unable to validate refresh token');
      });

    const user = await this.userRepository
      .createQueryBuilder()
      .where(`"User"."id" = :id`, { id: payload.id })
      .getOne();

    const newPayload = { id: user.id, name: user.name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(newPayload, jwtConfig.access),
      this.jwtService.signAsync(newPayload, jwtConfig.refresh),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async user(userId: number): Promise<Auth_UserResponse> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where(`"User"."id" = :id`, { id: userId })
      .getOne();

    if (!user) throw new NotFoundException();

    return user;
  }
}
