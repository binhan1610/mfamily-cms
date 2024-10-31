import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { useRequest } from 'ahooks';

export interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}
export const useLogout = (options: HandleEvent) => {
  return useRequest(
    () => {
      return privateRequest(request.get, API_PATH.AUTH_lOGOUT);
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
