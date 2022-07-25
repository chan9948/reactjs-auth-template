import jwtDecode, { JwtPayload } from 'jwt-decode';
import { JwtDto } from '../dtos/auth/jwt.dto';
import { SigninDto } from '../dtos/auth/signin.dto';
import { ResponseDto } from '../dtos/response.dto';
import { httpHelper } from '../helper/http.helper';
import { User } from '../types/user.type';

export const authService = {
  signin: async (dto: SigninDto): Promise<User | null> => {
    const response = await httpHelper.post<ResponseDto<JwtDto>>(
      httpHelper.constructPath('/auth/signin'),
      dto,
    );

    const jwt = response.data.data.jwt;
    const user = jwtDecode<User>(jwt) ?? null;
    if (user) {
      user.jwt = jwt;
    }

    return user;
  },
};
