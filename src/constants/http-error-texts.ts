import { HttpErrorCode } from 'src/typings/http-errors';

export const HTTP_ERROR_TEXTS: { [key in HttpErrorCode]: string } = {
  [HttpErrorCode.UserDuplicate]: 'User with such email already exists.',
};
