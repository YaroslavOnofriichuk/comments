import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CommentFilesModule } from './comment-files/comment-files.module';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConf, multerConfig } from '../config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        AuthModule,
        CommentsModule,
        CommentFilesModule,
        JwtModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConf],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        MulterModule.register(multerConfig),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'files'),
            serveRoot: '/dist',
        }),
    ],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
