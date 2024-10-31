import { API_PATH } from '@api/constant';
import { request } from '@api/request';
import { useRequest } from 'ahooks';

interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}

interface LoginProps {
  username: string;
  password: string;
}

export const useLogin = (options: HandleEvent) => {
  return useRequest(
    async (payload: LoginProps) => {
      return request.post(API_PATH.AUTH_LOGIN, {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
