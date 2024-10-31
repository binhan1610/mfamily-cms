export interface CheckShowPass {
  isShowPass: boolean;
  isShowPassNew: boolean;
  isShowPassConfirm: boolean;
  isLoading: boolean;
}

export interface InputProp {
  passOld: string;
  password: string;
  confirmPassword: string;
}

export interface ErrInput {
  passOld: string;
  password: string;
  confirmPassword: string;
}

export const initCheckShowPass: CheckShowPass = {
  isShowPass: false,
  isShowPassNew: false,
  isShowPassConfirm: false,
  isLoading: false,
};

export const initInput: InputProp = {
  passOld: '',
  password: '',
  confirmPassword: '',
};

export const initError: ErrInput = {
  passOld: '',
  password: '',
  confirmPassword: '',
};

export interface IProfile {
  id: 0;
  center_id: string;
  createdAt: null;
  deletedAt: null;
  description: string;
  email: string;
  employee_id: null;
  first_name: string;
  lastLogin: null;
  last_name: string;
  phone: string;
  store_type: string;
  sub_center_id: string;
  type: string;
  updatedAt: string;
  user_name: string;
}
