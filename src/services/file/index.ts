import { unlink } from 'fs/promises';
import Jimp from 'jimp';
import { fileFolder } from 'src/config';

export class FileSevice {
    async upload(file: Express.Multer.File, commentId: number) {
        try {
            const image = await Jimp.read(file.path);

            if (image.bitmap.width > 320 || image.bitmap.height > 240) {
                image.cover(320, 240);
            }
            const fileUrl = `/${commentId}/${file.filename}`;
            await image.writeAsync(fileFolder + fileUrl);
            await unlink(file.path);
            return 'files' + fileUrl;
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }

    async remove(url: string) {
        try {
            const filePath = new URL(url).pathname;
            await unlink('dist/' + filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
}
