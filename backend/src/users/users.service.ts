import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interface/user.interface';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
  ) {}
  private readonly users: User[] = [
    {
      id: 1,
      name: 'lady Mariupol',
      username: 'Slava',
      password: 'ukraini',
    },
    { id: 2, name: 'bro', username: 'john', password: 'changeme' },
  ];
  async findOne(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === Number(id));

    // return this.usersRepository.findOneBy({ idInt });
  }
  async findAll(): Promise<User[] | undefined> {
    // return this.usersRepository.find();
    return this.users;
  }

  async deleteOne(username: string): Promise<User | undefined> {
    return;
  }

  async createOne(user: UserInterface): Promise<User | undefined> {
    const res = this.usersRepository.save(user);

    // return res;
    console.log(user);
    return this.users[0];
  }
}
