import { Injectable } from '@nestjs/common';
import { UserApiService } from 'src/services/database/user-api.service';
import { User, UserEdit } from './user.typings';

@Injectable()
export class UserService {
  constructor(private userApiService: UserApiService) {}

  public getUserInfo(id: number): Promise<User> {
    return this.userApiService.getUserById(id);
  }

  public updateUser(id: number, updateUserInfo: UserEdit): Promise<User> {
    return this.userApiService.updateUser(id, updateUserInfo);
  }
}
