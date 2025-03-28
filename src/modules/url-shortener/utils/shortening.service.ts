import { Inject, Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { UrlShortener } from 'src/core/entities/url-shortener.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShorteningService {
  constructor(
    @Inject('URLSHORTENER_REPOSITORY')
    private urlShortenerRepository: Repository<UrlShortener>,
  ) {}

  _numberOfCharsInShortLink = 6;
  _alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  async generateUniqueCode() {
    const codeChars: string[] = [];

    while (true) {
      for (let i = 0; i < this._numberOfCharsInShortLink; i++) {
        const randomIndex = randomInt(this._alphabet.length - 1);

        codeChars.push(this._alphabet.charAt(randomIndex));
      }

      const code = codeChars.join('');

      const existCode = await this.urlShortenerRepository.findOneBy({
        shortenerLink: code,
      });
      if (existCode == null) {
        return code;
      }
    }
  }
}
