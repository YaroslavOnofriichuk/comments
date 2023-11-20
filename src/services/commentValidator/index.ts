import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentValidator {
  validate(text: string): boolean {
    const containsTagsRegex = /<([a-zA-Z]+)[^>]*>.*?<\/\1>|<([a-zA-Z]+)[^>]*>/;

    if (containsTagsRegex.test(text)) {
      const allowedTagsRegex = /<(a|code|i|strong)(\s+[^>]*?)?>.*?<\/\1>/g;

      if (!allowedTagsRegex.test(text)) {
        return false;
      }
    }

    return true;
  }
}
