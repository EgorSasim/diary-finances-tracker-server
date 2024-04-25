import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserEdit } from 'src/controllers/user/user.typings';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../password.service';
import { HttpErrorCode } from 'src/typings/http-errors';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private passwordService: PasswordService,
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

  public async updateUser(
    id: User['id'],
    updateParams: UserEdit,
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);
    if (!updateParams.newPassword || !updateParams.oldPassword) {
      const userEntity: UserEntity = {
        ...user,
        email: updateParams.email,
      };
      return this.usersRepository.save(userEntity);
    }
    if (
      !(await this.passwordService.validatePassword(
        updateParams.oldPassword,
        user.password,
      ))
    ) {
      throw new UnauthorizedException([HttpErrorCode.InvalidOldPassword]);
    }
    const hashedPassword = await this.passwordService.hashPassword(
      updateParams.newPassword,
    );
    const userEntity: UserEntity = {
      ...user,
      password: hashedPassword,
      email: updateParams.email,
    };
    return this.usersRepository.save(userEntity);
  }
}
