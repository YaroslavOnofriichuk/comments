import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Comments')
  .setDescription('The comments API description')
  .setVersion('1.0')
  .addTag('comments')
  .build();
