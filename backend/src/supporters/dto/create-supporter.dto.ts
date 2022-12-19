import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSupporterDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  password: string;
}
