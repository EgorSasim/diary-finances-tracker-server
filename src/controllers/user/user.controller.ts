import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  public getUser(@Req() req: Request) {
    return this.userService.getUserInfo(req['user']['id']);
  }
}
