import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  public async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === userName);
  }

  public async addUser(user: User): Promise<void> {
    await this.users.push(user);
    console.log('users: ', this.users);
  }

  public async getNextId(): Promise<number> {
    return this.users.length
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 0;
  }
}
