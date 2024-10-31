import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { useRequest } from 'ahooks';

export interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}

interface ListMarketingProps {
  page: number | string;
  limit: number | string;
  start_date?: string;
  end_date?: string;
  type_plan?: string;
}

export const useAddMarketing = (options: HandleEvent) => {
  return useRequest(
    (payload: any) => {
      return privateRequest(request.post, API_PATH.ADD_MARKETING, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useUpdateMarketing = (options: HandleEvent) => {
  return useRequest(
    (payload: any) => {
      return privateRequest(request.put, API_PATH.UPDATE_MARKETING, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useListMarketing = (options: HandleEvent) => {
  return useRequest(
    (payload: ListMarketingProps) => {
      const { limit, page, start_date, end_date, type_plan } = payload;
      console.log(
        `/marketing/list-marketing?page=${page}&limit=${limit}${
          !start_date ? '' : `&start_date=${start_date}`
        }${!end_date ? '' : `&end_date=${end_date}`}${!type_plan ? '' : `&type_plan=${type_plan}`}`,
      );

      return privateRequest(
        request.get,
        API_PATH.LIST_MARKETING(page, limit, start_date, end_date, type_plan),
      );
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useDetailMarketing = (options: HandleEvent) => {
  return useRequest(
    (marketing_id) => {
      return privateRequest(request.get, API_PATH.DETAIL_MARKETING(marketing_id));
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useGetReprotUserByDate = (options: HandleEvent) => {
  return useRequest(
    (payload: { limit: number; page: number; start_date?: string; end_date?: string }) => {
      return privateRequest(request.post, API_PATH.GET_REPORT_USER_BY_DATE, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useGetReprotUserByCycle = (options: HandleEvent) => {
  return useRequest(
    (payload: { limit: number; page: number; cycle: number }) => {
      return privateRequest(request.post, API_PATH.GET_REPORT_USER_BY_CYCLE, { data: payload });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useExportReportUserByCycle = (options: HandleEvent) => {
  return useRequest(
    (payload: { limit: number; page: number; cycle?: number }) => {
      return privateRequest(request.post, API_PATH.EXPORTCYCLE, {
        data: {
          limit: payload.limit,
          page: payload.page,
          cycle: payload.cycle,
        },
        responseType: 'blob',
      });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useExportReportUserByDate = (options: HandleEvent) => {
  return useRequest(
    (payload: { limit: number; page: number; start_date?: string; end_date?: string }) => {
      return privateRequest(request.post, API_PATH.EXPORTDATE, {
        data: {
          limit: payload.limit,
          page: payload.page,
          start_date: payload.start_date,
          end_date: payload.end_date,
        },
        responseType: 'blob',
      });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useGetMyProfile = (options: HandleEvent) => {
  return useRequest(
    () => {
      return privateRequest(request.get, API_PATH.GET_DETAIL_USER);
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useExportReportMarketing = (options: HandleEvent) => {
  return useRequest(
    (payload: ListMarketingProps) => {
      return privateRequest(request.post, API_PATH.EXPORTREPORTMARKETING, {
        data: payload,
        responseType: 'blob',
      });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const useExportFileExample = (options: HandleEvent) => {
  return useRequest(
    () => {
      return privateRequest(request.get, API_PATH.EXPORTEXAMPLE, {
        responseType: 'blob',
      });
    },
    {
      ...options,
      manual: true,
      debounceWait: 300,
    },
  );
};

export const calculateNumberOfDays = (startDate: string, endDate: string) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();
  const differenceInMilliseconds = endTimestamp - startTimestamp;
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);
  return differenceInDays + 1;
};
