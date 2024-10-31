export const ROUTE_PATH = {
  HOME: '/',
  SIGN_IN: '/sign_in',
  SIGN_UP: '/sign_up',
  TN: '/TN',
  SETTING: '/setting',
  SETTING_ADD_USER: '/setting/add_user',
  SETTING_EDIT_ROLE: '/setting/edit_role',
  SETTING_DETAIL: '/setting/detail',
  LIST_MEMBER: '/list_member',
  LIST_GROUP: '/list_group',
  UPDATE_PASSWORD: '/update_password',
  USER_DETAIL: '/detail_tvtb',
  USER_DETAIL_IN_LOG: '/detail_tvtb_in_log',
  USER_DETAIL_DISCONNECT: '/detail_tvtb_disconnect',
  LOG_LOGIN: '/check_log/log_login',
  LOG_CONNECTION: '/check_log/log_connection',
  NOTIFICATION: '/check_log/log_notification',
  LOCATION: '/check_log/log_location',
  SAFEZONE_SETTING: '/check_log/log_safezone_setting',
  //marketing
  UPDATE_MARKETING: '/update_campaign',
  LIST_MARKETING: 'list_campaign',
  ADD_MARKETING: '/create_campaign',
  REPORT_MARKETING: '/report_marketing',
};

export const TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
};

export const memoize = (fn: any) => {
  let cache: any = {};
  return (...args: any) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};
