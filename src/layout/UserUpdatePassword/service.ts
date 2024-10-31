import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { useRequest } from 'ahooks';

export interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}

interface UpdatePassword {
  password: string;
  new_password: string;
}
export const useUpdatePassword = (options: HandleEvent) => {
  return useRequest(
    (payload: UpdatePassword) => {
      return privateRequest(request.post, API_PATH.USER_UPDATE_PASSWORD, {
        data: payload,
      });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
