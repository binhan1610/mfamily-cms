import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import RCDatePicker from '@components/DatePicker';
import ActionHead from '@layout/components/ActionHead';
import SearchTable from '@layout/components/SearchTable';
import React, { useEffect, useState } from 'react';
import Select from '@components/Select';
import {
  useExportReportUserByCycle,
  useExportReportUserByDate,
  useGetMyProfile,
  useGetReprotUserByCycle,
  useGetReprotUserByDate,
} from '../service';
import { toast } from 'react-toastify';

interface PaginationState {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}

const cycleType = [
  {
    id: 'Hôm nay',
    name: 'Hôm nay',
  },
  {
    id: 'Hôm qua',
    name: 'Hôm qua',
  },
  {
    id: '7 ngày gần nhất',
    name: '7 ngày gần nhất',
  },
  {
    id: '30 ngày gần nhất',
    name: '30 ngày gần nhất',
  },
  {
    id: '90 ngày gần nhất',
    name: '90 ngày gần nhất',
  },
  {
    id: 'Chọn theo ngày',
    name: 'Chọn theo ngày',
  },
];

const cols = [
  {
    title: 'Thông tin',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Tổng user sử dụng',
    dataIndex: 'total_user_use',
    key: 'total_user_use',
  },
  {
    title: 'Tổng thiết bị kết nối',
    dataIndex: 'total_device_connect',
    key: 'total_device_connect',
  },
  {
    title: 'Tổng user active mới',
    dataIndex: 'total_user_active',
    key: 'total_user_active',
  },
  {
    title: 'Tổng user hủy',
    dataIndex: 'total_user_cancel',
    key: 'total_user_cancel',
  },
  {
    title: 'Tổng user login',
    dataIndex: 'total_user_login',
    key: 'total_user_login',
  },
];
function LogCampaign() {
  const [startDate, setStartDate] = useState<string>();
  const [check, setCheck] = useState<Boolean>(true);
  const [endDate, setEndDate] = useState<string>();
  const [cycle, setCycle] = useState<string>('Hôm nay');
  const [numberCycle, setNumberCycle] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 1 });
  const [r, setR] = useState<any>([]);
  const { page } = pagination;
  //function

  const handleSelectChange = (event: any) => {
    setCycle(event?.target?.value);
    switch (event?.target?.value) {
      case 'Hôm nay':
        setPagination({ page: 1, limit: 1 });
        break;
      case 'Hôm qua':
        setPagination({ page: 2, limit: 1 });
        break;
      case '7 ngày gần nhất':
        setNumberCycle(7);
        setPagination({ page: 1, limit: 7 });
        break;
      case '30 ngày gần nhất':
        setNumberCycle(30);
        setPagination({ page: 1, limit: 10 });
        break;
      case '90 ngày gần nhất':
        setNumberCycle(90);
        setPagination({ page: 1, limit: 10 });
        break;
      case 'Chọn theo ngày':
        setR([]);
        break;
      default:
        break;
    }
  };

  const handleExport = () => {
    switch (cycle) {
      case 'Hôm nay':
        exportReportUserByCycle.run({ ...pagination, cycle: numberCycle });
        break;
      case 'Hôm qua':
        exportReportUserByCycle.run({ ...pagination, cycle: numberCycle });
        break;
      case '7 ngày gần nhất':
        exportReportUserByCycle.run({ ...pagination, cycle: numberCycle });
        break;
      case '30 ngày gần nhất':
        exportReportUserByCycle.run({ ...pagination, cycle: numberCycle });
        break;
      case '90 ngày gần nhất':
        exportReportUserByCycle.run({ ...pagination, cycle: numberCycle });
        break;
      case 'Chọn theo ngày':
        if (!startDate && !endDate) toast.error('Vui lòng chọn khoảng thời gian');
        exportReportUserByDate.run({ ...pagination, start_date: startDate, end_date: endDate });
        break;
      default:
        break;
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date?.toISOString());
  };

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page, limit: 10 });
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      setPagination({
        page: 1,
        limit: 10,
        //   calculateNumberOfDays(startDate, endDate) <= 10
        //     ? calculateNumberOfDays(startDate, endDate)
        //     : 10,
        startDate: startDate,
        endDate: endDate,
      });
    } else toast.error('vui lòng nhập đủ ngày bắt đầu và ngày kết thúc');
  };
  ////call api////
  const exportReportUserByDate = useExportReportUserByDate({
    onSuccess: async (buffer) => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      a.download = `bao-cao-nguoi-dung.xlsx`;
      document.body.appendChild(a);
      a.click();
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const exportReportUserByCycle = useExportReportUserByCycle({
    onSuccess: async (buffer) => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      a.download = `bao-cao-nguoi-dung.xlsx`;
      document.body.appendChild(a);
      a.click();
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getMyProfile = useGetMyProfile({
    onSuccess: (resp) => {
      if (resp.data) {
        const permissions = resp.data.role.permissions;
        const checkRole = permissions.some((p: any) => p.apis.includes('View_User_Report'));
        if (checkRole) {
          setCheck(true);
        } else setCheck(false);
        // )
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getReportUserByCycle = useGetReprotUserByCycle({
    onSuccess: (resp) => {
      if (resp.data) {
        setR(resp?.data);
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getReportUserByDate = useGetReprotUserByDate({
    onSuccess: (resp) => {
      if (resp.data) {
        setR(resp?.data);
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  ////useEffect///
  useEffect(() => {
    getMyProfile.run();
    if (startDate && endDate) {
      getReportUserByDate.run({
        start_date: pagination.startDate,
        end_date: pagination.endDate,
        limit: pagination.limit,
        page: pagination.page,
      });
    } else getReportUserByCycle.run({ cycle: numberCycle, ...pagination });
  }, [pagination]);

  return (
    <>
      {check ? (
        <div>
          <ActionHead title={'Thống kê người dùng'}>
            <Button
              text='Xuất file'
              handleSubmit={handleExport}
              isLoading={exportReportUserByCycle.loading || exportReportUserByDate.loading}
            />
          </ActionHead>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchTable>
              <div style={{ display: 'block' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    width: '200px',
                    margin: cycle === 'Chọn theo ngày' ? '10px 0px 10px 0px' : '0px 0px 30px 0px',
                  }}
                >
                  <Select
                    data={cycleType}
                    value={cycle}
                    label='Chu kỳ:'
                    title='cycle'
                    disabled={false}
                    right='20px'
                    width='256px'
                    onChange={handleSelectChange}
                  />
                </div>
                {cycle === 'Chọn theo ngày' && (
                  <div style={{ margin: '10px 0px 30px 0px', display: 'flex' }}>
                    <RCDatePicker
                      width='130px'
                      margin='0px 40px 0px 70px'
                      label='Khoảng thời gian:'
                      onChange={handleStartDateChange}
                      value={startDate}
                      value2={endDate}
                      placeholder='Ngày bắt đầu'
                      placeholder2='Ngày kết thúc'
                      onChange2={handleEndDateChange}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <Button
                        text='Tìm kiếm'
                        bgColor='#FFFFFF'
                        color='black'
                        handleSubmit={handleSearch}
                        top='10px'
                      />
                    </div>
                  </div>
                )}
              </div>
            </SearchTable>
          </div>
          <div>
            <CustomTable
              data={r?.data || []}
              columns={cols}
              currentPage={cycle === 'Hôm qua' ? 1 : page}
              handlePagination={handlePagination}
              totalPage={r?.meta?.totalPages || 1}
              loading={getReportUserByDate.loading || getReportUserByCycle.loading}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>Không có quyền truy cập</div>
      )}
    </>
  );
}

export default LogCampaign;
