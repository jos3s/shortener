import { IsNotEmpty } from 'class-validator';

export class CreateUrlShortenerDto {
  @IsNotEmpty()
  url: string;
}
