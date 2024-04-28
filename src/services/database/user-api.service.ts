import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserEdit } from 'src/controllers/user/user.typings';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../password.service';
import { HttpErrorCode } from 'src/typings/http-errors';
import { INCOME_DEFAULT_TYPE_NAMES } from 'src/controllers/income-type/icnome-type.constants';
import { IncomeTypeEntity } from 'src/model/income/income-type.entity';
import { IncomeTypeApiService } from './income-type-api.service';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private passwordService: PasswordService,
    @Inject(forwardRef(() => IncomeTypeApiService))
    private incomeTypeApiService: IncomeTypeApiService,
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
    const userEntity = await this.usersRepository.save(user);
    console.log('user Entity: ', userEntity);
    return await this.setUserDefaultIncomeTypes(userEntity);
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

  private async setUserDefaultIncomeTypes(
    user: UserEntity,
  ): Promise<UserEntity> {
    const defaultIncomeTypes: IncomeTypeEntity[] = await Promise.all(
      INCOME_DEFAULT_TYPE_NAMES.map((name) =>
        this.incomeTypeApiService.createIncomeType(user.id, { id: null, name }),
      ),
    );
    const userEntity: UserEntity = {
      ...user,
      income_types: defaultIncomeTypes,
    };
    return await this.usersRepository.save(userEntity);
  }
}
