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

  public async isSameUserExists(email: string): Promise<boolean> {
    return !!(
      await this.usersRepository.find({
        where: { email: email },
      })
    ).length;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  public async addUser(user: Omit<User, 'id'>): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }
}
