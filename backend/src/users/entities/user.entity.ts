import { ApiProperty } from '@nestjs/swagger';
//even if its not used as an js array we can use it for swagger docs

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
