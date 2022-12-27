import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class editBookmarkDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  link?: string;
}
