import { Injectable } from '@nestjs/common';
import { UserApiService } from 'src/services/database/user-api.service';
import { User } from '../auth/auth.typings';

@Injectable()
export class UserService {
  constructor(private userApiService: UserApiService) {}

  public getUserInfo(id: number): Promise<User> {
    return this.userApiService.getUserById(id);
  }
}
