import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
