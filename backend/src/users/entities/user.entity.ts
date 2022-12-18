import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
//even if its not used as an js array we can use it for swagger docs

export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column('varchar')
  username: string;

  @ApiProperty()
  @Column('varchar')
  password: string;
}
