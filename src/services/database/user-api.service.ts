import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/controllers/user/user.typings';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async isSameUserExists(login: string): Promise<boolean> {
    return !!(
      await this.usersRepository.find({
        where: { login },
      })
    ).length;
  }

  public async getUserByLogin(login: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { login } });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  public async addUser(user: Omit<User, 'id'>): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }
}
