import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupporterEntity extends BaseEntity {
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

  constructor(name?: string, username?: string, password?: string) {
    super();
    this.name = name || '';
    this.username = username || '';
    this.password = password || '';
  }
}
