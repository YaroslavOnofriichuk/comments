import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerConfig = {
    dest: 'dist/tmp',
};

const allowedTypes = ['txt', 'jpg', 'gif', 'png'];

export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (!file) {
            cb(
                new HttpException('File is required', HttpStatus.BAD_REQUEST),
                false,
            );
        }

        const fileName = file.originalname;
        const extension = fileName.slice(
            ((fileName.lastIndexOf('.') - 1) >>> 0) + 2,
        );

        if (extension && !allowedTypes.includes(extension)) {
            cb(
                new HttpException(
                    'File with same extension is not allowed',
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        if (extension === 'txt' && file.size > 100) {
            cb(
                new HttpException(
                    'Text files should not had size bigger than 100 kb',
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        cb(null, true);
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
    dest: multerConfig.dest,
};
