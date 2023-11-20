import { User } from 'src/entities/user/user.entity';
import { PickType } from '@nestjs/swagger';

export class Auth_UserResponse extends PickType(User, [
  'id',
  'email',
  'name',
  'createdAt',
  'updatedAt',
]) {}
