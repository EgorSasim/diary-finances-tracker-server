import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/controllers/auth/auth.typings';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async isSameUserExists(email: string): Promise<boolean> {
    return !!(
      await this.usersRepository.find({
        where: { email: email },
      })
    ).length;
  }

  public async getUser(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  public async addUser(user: Omit<User, 'id'>): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }
}
