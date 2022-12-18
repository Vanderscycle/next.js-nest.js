import { ApiProperty } from '@nestjs/swagger';

export class CreateSupporterDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;
}
