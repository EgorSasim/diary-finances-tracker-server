import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/controllers/auth/auth.typings';
import { UserEntity } from 'src/model/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === userName);
  }

  public async addUser(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  public async getNextId(): Promise<number> {
    return this.users.length
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 0;
  }
}
