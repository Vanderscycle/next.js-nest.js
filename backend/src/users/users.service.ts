import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'lady Mariupol',
      username: 'Slava',
      password: 'ukraini',
    },
    { id: 2, name: 'bro', username: 'john', password: 'changeme' },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async findAll(): Promise<User[] | undefined> {
    return this.users;
  }

  async deleteOne(username: string): Promise<User | undefined> {
    return;
  }

  async createOne(username: string): Promise<User | undefined> {
    return;
  }
}
