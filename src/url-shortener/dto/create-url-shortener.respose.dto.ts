export class CreateUrlShortenerResponseDto {
  link: string;

  constructor(url: string) {
    this.link = url;
  }
}
