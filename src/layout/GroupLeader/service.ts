import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { useRequest } from 'ahooks';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}
interface ListUserProps {
  page: number;
  limit: number;
  keyword?: string;
  phone?: string;
}

interface GetLog {
  page: number;
  limit: number;
  phone: string;
  keyword?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  phoneChild?: string | undefined;
}
export const useGetListParent = (options: HandleEvent) => {
  return useRequest(
    (payload: ListUserProps) => {
      return privateRequest(
        request.get,
        API_PATH.SEARCH_PARENT(payload.page, payload.limit, payload.keyword),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useGetListUserGroup = (options: HandleEvent) => {
  return useRequest(
    (payload: ListUserProps) => {
      return privateRequest(
        request.get,
        API_PATH.GET_LIST_USER_GROUP(payload.page, payload.limit, payload.keyword, payload.phone),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useExport = (options: HandleEvent) => {
  return useRequest(
    (payload: ListUserProps) => {
      return privateRequest(
        request.get,
        API_PATH.EXPORT(payload.page, payload.limit, payload.keyword, payload.phone),
        {
          responseType: 'blob',
        },
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};
export const useDetailUser = (options: HandleEvent) => {
  return useRequest(
    (id: number) => {
      return privateRequest(request.get, API_PATH.DETAIL(id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useDetailUserInLog = (options: HandleEvent) => {
  return useRequest(
    (id: number) => {
      return privateRequest(request.get, API_PATH.DETAILUSERINLOG(id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useDetailUserDisconnect = (options: HandleEvent) => {
  return useRequest(
    (id: number) => {
      return privateRequest(request.get, API_PATH.DETAILUSERDISCONNECT(id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useDisconectionTVTB = (options: HandleEvent) => {
  return useRequest(
    (id: number) => {
      return privateRequest(request.delete, API_PATH.DISCONECTION(id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useLogLogin = (options: HandleEvent) => {
  return useRequest(
    (payload: GetLog) => {
      return privateRequest(
        request.get,
        API_PATH.LOGLOGIN(
          payload.page,
          payload.limit,
          payload.phone,
          payload.keyword,
          payload.startDate,
          payload.endDate,
          payload.phoneChild,
        ),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useLogConnection = (options: HandleEvent) => {
  return useRequest(
    (payload: GetLog) => {
      return privateRequest(
        request.get,
        API_PATH.LOG_CONNECTION(
          payload.page,
          payload.limit,
          payload.phone,
          payload.keyword,
          payload.startDate,
          payload.endDate,
          payload.phoneChild,
        ),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useLogNotification = (options: HandleEvent) => {
  return useRequest(
    (payload: GetLog) => {
      return privateRequest(
        request.get,
        API_PATH.LOGNO_TIFICATION(
          payload.page,
          payload.limit,
          payload.phone,
          payload.keyword,
          payload.startDate,
          payload.endDate,
        ),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useLogLocation = (options: HandleEvent) => {
  return useRequest(
    (payload: GetLog) => {
      return privateRequest(
        request.get,
        API_PATH.LOG_LOCATION(
          payload.page,
          payload.limit,
          payload.phone,
          payload.keyword,
          payload.startDate,
          payload.endDate,
        ),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useLogSafezoneSetting = (options: HandleEvent) => {
  return useRequest(
    (payload: GetLog) => {
      return privateRequest(
        request.get,
        API_PATH.LOG_SAFEZONE_SETTING(
          payload.page,
          payload.limit,
          payload.phone,
          payload.keyword,
          payload.startDate,
          payload.endDate,
        ),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const convertTime = (date: Date, type?: string) => {
  if (type) {
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
  }
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

export const converPhone = (phone?: string) => {
  if (phone && phone.startsWith('0') && phone.length >= 10) {
    return phone;
  } else if (phone && phone.startsWith('84') && phone.length > 10) {
    return '0' + phone.substring(2);
  } else return '#####';
};

// export const setUpTime = (date: Date) => {
//   const currentDate = new Date();
//   const targetDate = new Date(date).getTime();
//   const now = currentDate.getTime();
//   const diff = now - targetDate;
//   const diffHours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
//   const diffMinutes = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
//   const diffSeconds = Math.abs(Math.floor((diff % (1000 * 60)) / 1000));
//   return `${diffHours} giờ, ${diffMinutes} phút, ${diffSeconds} giây`;
// };

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime());
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  };
  const formattedDate = localDate.toLocaleDateString('en-US', options);
  return formattedDate.replace(',', ' at');
};

export const reConverPhone = (phone: string) => {
  const containsNonDigit = /\D/.test(phone);
  if (containsNonDigit) {
    toast.error('số điện thoại không hợp lệ');
    return;
  }
  if (!phone.startsWith('0') || phone.length < 10) {
    toast.error('số điện thoại không hợp lệ');
    return;
  } else return `84${phone.slice(1)}`;
};
export const checkKeyword = (keyword: string) => {
  if (keyword) {
    const containsNonDigit = /\D/.test(keyword);
    if (containsNonDigit) {
      return keyword;
    }
    if (!keyword.startsWith('0') || keyword.length < 10) {
      toast.error('số điện thoại không hợp lệ');
    } else return `84${keyword.slice(1)}`;
  }
};
export const checkPhoneInLog = (phone: string) => {
  const containsNonDigit = /\D/.test(phone);
  if (containsNonDigit) {
    toast.error('số điện thoại không hợp lệ1');
  }
  if (!phone.startsWith('0') || phone.length < 10) {
    toast.error('số điện thoại không hợp lệ');
  } else return phone;
};
