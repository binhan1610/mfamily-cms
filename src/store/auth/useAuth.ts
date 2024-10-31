import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { ROUTE_PATH } from '@utils/common';
import { authAtom, IAuth } from './auth';
import { useProfile } from '@store/profile/useProfile';

export const setAuthCookies = ({
  id,
  token,
  refreshToken,
  expiredTime,
}: {
  id?: number;
  token: string;
  refreshToken: string;
  expiredTime?: number;
}) => {
  setCookie('id', id);
  setCookie('token', token);
  setCookie('refreshToken', refreshToken);
  setCookie('expiredTime', expiredTime);
};

export const deleteAuthCookies = () => {
  deleteCookie('id');
  deleteCookie('token');
  deleteCookie('refreshToken');
  deleteCookie('expiredTime');
};

export const useAuth = () => {
  const { requestGetProfile } = useProfile();
  const [auth, setAuth] = useRecoilState(authAtom);
  const router = useRouter();
  const setAuthData = (data: IAuth): void => {
    setAuth({ ...auth, ...data });
  };

  const onLogout = () => {
    router.push(ROUTE_PATH.SIGN_IN);
    setAuthData({
      id: 0,
      token: '',
      refreshToken: '',
      expiredTime: 0,
    });
    deleteAuthCookies();
  };

  const onLogin = (data: IAuth) => {
    try {
      setAuthData(data);
      setAuthCookies({
        id: data.id,
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
      if (data?.id) {
        requestGetProfile.run(data?.id, () => router.push(ROUTE_PATH.LIST_GROUP));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    auth,
    isLogin: !!auth?.token,
    setAuthData,
    onLogin,
    onLogout,
  };
};
