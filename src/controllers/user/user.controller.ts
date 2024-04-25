import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserEdit } from './user.typings';
import { getUserTruthyTypes } from './user.helpers';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  public getUser(@Req() req: Request): Promise<User> {
    return this.userService.getUserInfo(req['user']['id']);
  }

  @Post()
  public updateUser(
    @Req() req: Request,
    @Body() userEditInfo: UserEdit,
  ): Promise<User> {
    const userId: number = req['user']['id'];
    return this.userService.updateUser(
      userId,
      getUserTruthyTypes(userEditInfo),
    );
  }
}
