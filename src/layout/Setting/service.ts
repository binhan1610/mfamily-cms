import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { useRequest } from 'ahooks';

export interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}

interface AddUserProps {
  role: string;
  center_id: string;
  sub_center_id: string;
  employee_id: string;
  store_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description: string;
  user_name: string;
  pass_word: string;
}

interface UpdateRole {
  user_id: number;
  role: any;
  listPermission: string[];
}

interface UpdatePassword {
  password: string;
  new_password: string;
}

interface AdminUpdatePassword {
  user_id: number;
  new_password: string;
}

interface DeleteUser {
  user_id: number;
}

interface ListUserProps {
  page: number;
  limit: number;
  keyword?: string;
}

export const useCreateUser = (options: HandleEvent) => {
  return useRequest(
    (payload: AddUserProps) => {
      return privateRequest(request.post, API_PATH.ADD_ACCOUNT_USER, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
export const useViewUser = (options: HandleEvent) => {
  return useRequest(
    (params: ListUserProps) => {
      return privateRequest(
        request.get,
        API_PATH.SEARCH_ACCOUNT_ADMIN(params.page, params.limit, params.keyword),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
export const useViewProfileUser = (options: HandleEvent) => {
  return useRequest(
    (user_id: number) => {
      return privateRequest(request.get, API_PATH.VIEW_PROFILE_USER(user_id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useUpdateRoleUser = (options: HandleEvent) => {
  return useRequest(
    (payload: UpdateRole) => {
      return privateRequest(request.post, API_PATH.UPDATE_ROLE_USER, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useDeleteUser = (options: HandleEvent) => {
  return useRequest(
    (payload: DeleteUser) => {
      return privateRequest(request.post, API_PATH.DELETE_USER, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useUpdatePassword = (options: HandleEvent) => {
  return useRequest(
    (payload: UpdatePassword) => {
      return privateRequest(request.post, API_PATH.USER_UPDATE_PASSWORD, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useAdminUpdatePassword = (options: HandleEvent) => {
  return useRequest(
    (payload: AdminUpdatePassword) => {
      return privateRequest(request.post, API_PATH.ADMIN_UPDATE_PASSWORD_USER, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useCheckUser = (options: HandleEvent) => {
  return useRequest(
    (payload: { email: string; user_name: string }) => {
      return privateRequest(request.post, API_PATH.CHECK_USER, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
