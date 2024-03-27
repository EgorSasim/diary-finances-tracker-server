import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public';
import { AccessToken, User } from './auth.typings';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  public signIn(@Body() signInDto: User): Promise<AccessToken> {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signUp')
  public signUp(@Body() signUpDto: User): Promise<AccessToken> {
    return this.authService.signUp(signUpDto);
  }
}
