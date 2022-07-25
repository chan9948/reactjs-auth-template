import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useSnackbar } from 'notistack';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/routePath.constant';
import { SigninDto } from '../dtos/auth/signin.dto';
import { httpHelper } from '../helper/http.helper';
import { localStorageHelper } from '../helper/localStorage.helper';
import { authService } from '../services/auth.service';
import { AuthContextType } from '../types/auth.type';
import { User } from '../types/user.type';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export type AuthProviderPropsType = {
  children: ReactNode;
};

export const AuthProvider = (props: AuthProviderPropsType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const login = async (dto: SigninDto): Promise<boolean> => {
    const userData = await authService.signin(dto);

    setUser(userData);
    localStorageHelper.set('user', userData);
    return Boolean(userData);
  };

  const logout = () => {
    setUser(null);
    localStorageHelper.set('user', null);
  };

  const checkIsLogin = useCallback((): boolean => {
    if (user && user?.jwt) {
      const decode = jwtDecode<JwtPayload>(user.jwt);
      return (decode.exp ?? 0) * 1000 > Date.now();
    }
    return false;
  }, [user]);

  const value = { user, login, logout, checkIsLogin };

  useEffect(() => {
    setUser(localStorageHelper.get<User>('user'));
    setIsLoaded(true);
  }, [setUser]);

  useEffect(() => {
    if (user?.jwt) httpHelper.setRequestInterceptors(user.jwt);
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {isLoaded ? props.children : 'loading'}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = (): JSX.Element => {
  const authContext = useAuthContext();

  if (authContext?.checkIsLogin()) {
    return <Outlet />;
  }

  return <Navigate to={ROUTE_PATH.LOGIN} replace />;
};
