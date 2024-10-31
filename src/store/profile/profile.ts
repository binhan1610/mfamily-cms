import { atom } from 'recoil';
import { ENV } from '@utils/env';
import { IProfile } from '@utils/type';

export const initialProfile: IProfile = {
  id: 0,
  center_id: '',
  createdAt: null,
  deletedAt: null,
  description: '',
  email: '',
  employee_id: null,
  first_name: '',
  lastLogin: null,
  last_name: '',
  phone: '',
  store_type: '',
  sub_center_id: '',
  type: '',
  updatedAt: '',
  user_name: '',
};

export const profileAtom = atom({
  key: `${ENV.LOCAL_STORAGE_KEY}_PROFILE`,
  default: {
    ...initialProfile,
  },
});
