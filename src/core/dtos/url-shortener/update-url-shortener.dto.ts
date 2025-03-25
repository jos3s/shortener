import { IsNotEmpty } from 'class-validator';

export class UpdateUrlShortenerDto {
  @IsNotEmpty()
  url: string;
}
