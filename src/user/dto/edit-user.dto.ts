import { IsEmail, IsOptional, IsString } from 'class-validator';
import { isString } from 'util';
export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
