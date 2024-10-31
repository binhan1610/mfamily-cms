import CustomTable from '@components/CustomTable';
import ActionHead from '@layout/components/ActionHead';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ROUTE_PATH } from '@utils/common';
import { convertTime } from '@layout/GroupLeader/service';
import { useGetMyProfile, useListMarketing } from '../service';
import Button from '@components/Button';

interface PaginationState {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}
function LogCampaign() {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [r, setR] = useState<any>([]);
  const [check, setCheck] = useState(true);
  const { page } = pagination;

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };

  const handleDetailItem = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.UPDATE_MARKETING,
      query: { id },
    });
  };

  ////call api////
  const getMyProfile = useGetMyProfile({
    onSuccess: (resp) => {
      if (resp.data) {
        const permissions = resp.data.role.permissions;
        const checkRole = permissions.some((p: any) =>
          p.apis.includes('View_Create_Marketing_Campaign'),
        );
        if (checkRole) {
          setCheck(true);
          getListMarketing.run(pagination);
        } else {
          setCheck(false);
        }
        // )
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getListMarketing = useListMarketing({
    onSuccess: (resp) => {
      if (resp.data) {
        setR(resp?.data);
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  ///
  useEffect(() => {
    getMyProfile.run();
  }, [pagination]);

  const cols = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name_campaign',
      key: 'name_campaign',
      render: (_: number, record: any) => (
        <div
          style={{ color: '#5595FF', textDecoration: 'underline' }}
          onClick={() => handleDetailItem(record.id)}
        >
          {record.name_campaign}
        </div>
      ),
    },
    {
      title: 'Mục tiêu',
      dataIndex: 'objective',
      key: 'objective',
    },
    {
      title: 'Lần chạy cuối',
      dataIndex: 'last_run',
      key: 'last_run',
      render: (_: number, record: any) => (
        <>{record.last_run ? convertTime(new Date(record?.last_run)) : ''}</>
      ),
    },
    // {
    //   title: 'Loại nhóm',
    //   dataIndex: 'model',
    //   key: 'model',
    //   render: (_: number, record: any) => <>{record?.criteria?.type_group}</>,
    // },
    // {
    //   title: 'Gói cước',
    //   dataIndex: 'package',
    //   key: 'package',
    //   render: (_: number, record: any) => <>{record?.criteria?.package}</>,
    // },
    // {
    //   title: 'Tình trạng gói',
    //   dataIndex: 'status_package',
    //   key: 'status_package',
    //   render: (_: number, record: any) => <>{record?.criteria?.status_package}</>,
    // },
    {
      title: 'Số thành viên',
      dataIndex: 'criteria_member',
      key: 'criteria_member',
      render: (_: number, record: any) => <>{record?.criteria?.criteria_member}</>,
    },
    // {
    //   title: 'Đã gọi nội mạng',
    //   dataIndex: 'on_net_call',
    //   key: 'on_net_call',
    //   render: (_: number, record: any) => <>{record?.criteria?.on_net_call}</>,
    // },
    // {
    //   title: 'Đã gọi nội mạng',
    //   dataIndex: 'out_net_call',
    //   key: 'out_net_call',
    //   render: (_: number, record: any) => <>{record?.criteria?.out_net_call}</>,
    // },
    // {
    //   title: 'Đã gọi sử dụng',
    //   dataIndex: 'uesd_data',
    //   key: 'uesd_data',
    //   render: (_: number, record: any) => <>{record?.criteria?.uesd_data}</>,
    // },
    // {
    //   title: 'Thời gian đăng ký gói',
    //   dataIndex: 'time_register_package',
    //   key: 'time_register_package',
    //   render: (_: number, record: any) => <>{record?.criteria?.time_register_package}</>,
    // },
    {
      title: 'Đối tượng',
      dataIndex: 'object',
      key: 'object',
    },
  ];
  return (
    <div>
      <ActionHead title={'Danh sách chiến dịch Marketing'}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button
            text='Tạo mới'
            handleSubmit={() => {
              router.push({ pathname: ROUTE_PATH.ADD_MARKETING });
            }}
            isDisabled={check ? false : true}
          />
          <Button
            text='Xem báo cáo'
            handleSubmit={() => {
              router.push({ pathname: ROUTE_PATH.REPORT_MARKETING });
            }}
            isDisabled={check ? false : true}
          />
        </div>
      </ActionHead>
      {check ? (
        <div>
          <CustomTable
            data={r?.data || []}
            columns={cols}
            currentPage={page}
            handlePagination={handlePagination}
            totalPage={r?.meta?.totalPages || 1}
            loading={getListMarketing.loading}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>Không có quyền truy cập</div>
      )}
    </div>
  );
}

export default LogCampaign;
