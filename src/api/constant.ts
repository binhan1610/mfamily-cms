export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/admin/login',
  USER: (id: number) => `/user/${id}`,
  GET_DETAIL_USER: `/admin-account/admin/my-profile`,
  AUTH_lOGOUT: '/auth/admin/logout',
  //user
  SEARCH_ACCOUNT_ADMIN: (page: number, limit: number, keyword?: string) =>
    `/admin-account/admin/search-account-admin?page=${page}&limit=${limit}${
      keyword ? `&keyword=${keyword}` : ''
    }`,
  VIEW_ACCOUNT_USER: (page: number, limit: number) =>
    `/admin-account/admin/get-list-account-admin?page=${page}&limit=${limit}`,
  ADD_ACCOUNT_USER: '/admin-account/super-admin/add-account-admin',
  VIEW_PROFILE_USER: (user_id: number) => `/admin-account/admin/profile-account-admin/${user_id}`,
  UPDATE_ROLE_USER: '/role/admin-update-role',
  DELETE_USER: '/admin-account/admin/delete-account-admin',
  USER_UPDATE_PASSWORD: '/admin-account/admin/user-update-password',
  ADMIN_UPDATE_PASSWORD_USER: '/admin-account/super-admin/update-password-user',

  //leader
  GET_LIST_PARENT: (page: number, limit: number) =>
    `/admin-account/admin/list-parent?page=${page}&limit=${limit}`,
  SEARCH_PARENT: (page: number, limit: number, keyword?: string) =>
    `/admin-account/admin/search-parent?page=${page}&limit=${limit}${
      keyword ? `&keyword=${keyword}` : ''
    }`,

  //user-group
  GET_LIST_USER_GROUP: (page: number, limit: number, keyword?: string, phone?: string) =>
    `/admin-account/admin/user-in-group?page=${page}&limit=${limit}${
      keyword ? `&keyword=${keyword}` : ''
    }${phone ? `&phone=${phone}` : ''}`,

  EXPORT: (page: number, limit: number, keyword?: string, phone?: string) =>
    `/admin-account/export?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}${
      phone ? `&phone=${phone}` : ''
    }`,
  EXPORTREPORTMARKETING: '/marketing/export/report-markeitng',
  EXPORTEXAMPLE: `/marketing/export-file-list-user`,
  EXPORTCYCLE: '/admin-account/export/get-report-user-by-cycle',
  EXPORTDATE: '/admin-account/export/get-report-user-by-date',
  DETAIL: (id: number) => `/admin-account/admin/get-detail-tvtb/${id}`,
  DETAILUSERINLOG: (id: number) => `/admin-account/admin/get-detail-tvtb-in-log/${id}`,
  DETAILUSERDISCONNECT: (id: number) => `/admin-account/admin/get-detail-tvtb-disconnect/${id}`,
  DISCONECTION: (id: number) => `/admin-account/admin/disconnect-tvtb/${id}`,
  LOGLOGIN: (
    page: number,
    limit: number,
    phone: string,
    keyword?: string,
    startDate?: string,
    endDate?: string,
    phoneChild?: string,
  ) =>
    `/admin-account/admin/get-log-login?page=${page}&limit=${limit}&phone_parent=${phone}${
      keyword ? `&keyword=${keyword}` : ''
    }${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}${
      phoneChild ? `&phoneChild=${phoneChild}` : ''
    }`,
  LOG_CONNECTION: (
    page: number,
    limit: number,
    phone: string,
    keyword?: string,
    startDate?: string,
    endDate?: string,
    phoneChild?: string,
  ) =>
    `/admin-account/admin/get-log-connection?page=${page}&limit=${limit}&phone_parent=${phone}${
      keyword ? `&keyword=${keyword}` : ''
    }${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}${
      phoneChild ? `&phone_child=${phoneChild}` : ''
    }`,
  LOGNO_TIFICATION: (
    page: number,
    limit: number,
    phone: string,
    keyword?: string,
    startDate?: string,
    endDate?: string,
  ) =>
    `/admin-account/admin/get-notification?page=${page}&limit=${limit}&phone_parent=${phone}${
      keyword ? `&keyword=${keyword}` : ''
    }${!startDate ? '' : `&startDate=${startDate}`}${!endDate ? '' : `&endDate=${endDate}`}`,
  LOG_LOCATION: (
    page: number,
    limit: number,
    phone: string,
    keyword?: string,
    startDate?: string,
    endDate?: string,
  ) =>
    `/admin-account/admin/get-location?page=${page}&limit=${limit}&phone_parent=${phone}${
      keyword ? `&keyword=${keyword}` : ''
    }${!startDate ? '' : `&startDate=${startDate}`}${!endDate ? '' : `&endDate=${endDate}`}`,
  LOG_SAFEZONE_SETTING: (
    page: number,
    limit: number,
    phone: string,
    keyword?: string,
    startDate?: string,
    endDate?: string,
  ) =>
    `/admin-account/admin/get-safezone-setting?page=${page}&limit=${limit}&phone_parent=${phone}${
      keyword ? `&keyword=${keyword}` : ''
    }${!startDate ? '' : `&startDate=${startDate}`}${!endDate ? '' : `&endDate=${endDate}`}`,
  GET_REPORT_USER_BY_DATE: '/admin-account/admin/get-report-user-by-date',
  GET_REPORT_USER_BY_CYCLE: '/admin-account/admin/get-report-user-by-cycle',
  EXPORT_FILE_REPORT_USER: '/admin-account/export/get-report-user',
  CHECK_USER: '/admin-account/check-user',
  //marketing
  ADD_MARKETING: '/marketing/add-marketing',
  UPDATE_MARKETING: '/marketing/update-marketing',
  LIST_MARKETING: (
    page: number | string,
    limit: number | string,
    start_date?: string,
    end_date?: string,
    type_plan?: string,
  ) =>
    `/marketing/list-marketing?page=${page}&limit=${limit}${
      !start_date ? '' : `&start_date=${start_date}`
    }${!end_date ? '' : `&end_date=${end_date}`}${!type_plan ? '' : `&type_plan=${type_plan}`}`,
  DETAIL_MARKETING: (marketing_id: number) => `/marketing/detail/${marketing_id}`,
};
