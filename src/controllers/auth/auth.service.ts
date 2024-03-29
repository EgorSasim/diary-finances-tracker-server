import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, SignIn, SignUp } from './auth.typings';
import { HttpErrorCode } from 'src/typings/http-errors';
import { PasswordService } from 'src/services/password.service';
import { UserApiService } from 'src/services/database/user-api.service';

@Injectable()
export class AuthService {
  constructor(
    private userApiService: UserApiService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  public async signIn(signInData: SignIn): Promise<AccessToken> {
    const user = await this.userApiService.getUserByEmail(signInData.email);
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
    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  public async signUp(signUpData: SignUp): Promise<AccessToken> {
    const isSameUserExists = await this.userApiService.isSameUserExists(
      signUpData.email,
    );
    if (isSameUserExists) {
      throw new ConflictException([HttpErrorCode.UserDuplicate]);
    }
    const hashedPassword = await this.passwordService.hashPassword(
      signUpData.password,
    );
    const addedUser = await this.userApiService.addUser({
      ...signUpData,
      password: hashedPassword,
    });
    const payload = { id: addedUser.id, email: signUpData.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
