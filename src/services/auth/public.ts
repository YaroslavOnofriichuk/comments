import { SetMetadata } from '@nestjs/common';

export const PublicKey = Symbol('PUBLIC_KEY');
export const Public = () => SetMetadata(PublicKey, true);
