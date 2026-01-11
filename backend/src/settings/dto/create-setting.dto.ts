import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @MaxLength(50)
  setting_key: string;

  @IsString()
  @MaxLength(255)
  setting_value: string;

  @IsOptional()
  @IsString()
  description?: string;
}