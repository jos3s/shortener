export class UrlShortenerResponseDto {
  id: number;
  link: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, url: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.link = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
