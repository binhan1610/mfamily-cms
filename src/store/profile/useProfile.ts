/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from 'ahooks';
import { useRecoilState } from 'recoil';
import { privateRequest, request } from '@api/request';
import { profileAtom, initialProfile } from './profile';
import { API_PATH } from '@api/constant';
export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileAtom);

  const requestGetProfile = useRequest(
    async (id?: number, callback?: () => void) => {
      if (id) {
        const profile = await privateRequest(request.get, API_PATH.GET_DETAIL_USER);
        return profile;
      }
    },
    {
      manual: true,
      onSuccess: (r, params) => {
        const callback = params?.[1];
        if (!!r) {
          setProfile({
            ...profile,
            ...r?.data,
          });
          if (callback) callback();
        }
      },
      onError: () => {
        setProfile(initialProfile);
      },
    },
  );
  return {
    profile,
    setProfile,
    requestGetProfile,
  };
};
