import { atom } from 'recoil';
import { getCookies } from 'cookies-next';
import { ENV } from '@utils/env';

const authCache = getCookies();

export interface IAuth {
  id: number;
  loading?: boolean;
  token: string | undefined;
  refreshToken?: string;
  expiredTime: number;
}

let initialAuth: IAuth = {
  id: 0,
  loading: true,
  token: '',
  refreshToken: '',
  expiredTime: 0,
};

if (authCache) {
  initialAuth = {
    id: Number(authCache?.id),
    token: authCache.token,
    refreshToken: authCache.refreshToken,
    expiredTime: Number(authCache.expiredTime),
  };
}

export const authAtom = atom({
  key: `${ENV.LOCAL_STORAGE_KEY}_AUTH`,
  default: {
    ...initialAuth,
  },
});
