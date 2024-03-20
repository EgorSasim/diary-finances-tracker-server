import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user/user.service';
import { AccessToken, SignIn, SignUp } from './auth.typings';
import { HttpErrorCode } from 'src/typings/http-errors';
import { PasswordService } from 'src/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  public async signIn(signInData: SignIn): Promise<AccessToken> {
    const user = await this.userService.findOne(signInData.email);
    if (!user) {
      throw new UnauthorizedException([HttpErrorCode.InvalidCreds]);
    }
    if (
      !(await this.passwordService.validatePassword(
        signInData.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException([HttpErrorCode.InvalidCreds]);
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  public async signUp(signUpData: SignUp): Promise<AccessToken> {
    const user = await this.userService.findOne(signUpData.email);
    if (user) {
      throw new ConflictException([HttpErrorCode.UserDuplicate]);
    }
    const id = await this.userService.getNextId();
    const hashedPassword = await this.passwordService.hashPassword(
      signUpData.password,
    );
    await this.userService.addUser({
      ...signUpData,
      id,
      password: hashedPassword,
    });
    const payload = { sub: id, email: signUpData.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
