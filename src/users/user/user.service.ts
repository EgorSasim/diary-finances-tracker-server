import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john@mail.com',
      name: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      email: 'maria@la.ts',
      name: 'mariadb)',
      password: 'guess',
    },
    { id: 3, email: 'val@ma', name: 'valma', password: '11' },
  ];

  public async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === userName);
  }

  public async addUser(user: User): Promise<void> {
    await this.users.push(user);
    return;
  }

  public async getNextId(): Promise<number> {
    return Math.max(...this.users.map((user) => user.id)) + 1;
  }
}
