import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import RCDatePicker from '@components/DatePicker';
import ActionHead from '@layout/components/ActionHead';
import SearchTable from '@layout/components/SearchTable';
import React, { useEffect, useState } from 'react';
import { convertTime } from '@layout/GroupLeader/service';
import Select from '@components/Select';
import { useExportReportMarketing, useListMarketing } from '../service';
const cycleType = [
  {
    id: 'Theo ngày',
    name: 'Theo ngày',
  },
  {
    id: 'Lặp lại theo ngày',
    name: 'Lặp lại theo ngày',
  },
  {
    id: 'Theo tháng',
    name: 'Theo tháng',
  },
  {
    id: 'Theo tuần',
    name: 'Theo tuần',
  },
];
const cols = [
  {
    title: 'Tên chiến dịch',
    dataIndex: 'name_campaign',
    key: 'name_campaign',
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
    render: (_: number, record: any) => <>{record.last_run ? convertTime(record.last_run) : ''}</>,
  },
  {
    title: 'Số tin gửi thành công',
    dataIndex: 'number_success',
    key: 'number_success',
  },
  {
    title: 'Số tin được mở',
    dataIndex: 'number_open',
    key: 'number_open',
  },
  {
    title: 'Đối tượng',
    dataIndex: 'object',
    key: 'object',
  },
];
interface PaginationState {
  page: number;
  limit: number;
  start_date?: string;
  end_date?: string;
  type_plan?: string;
}
function LogCampaign() {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [cycle, setCycle] = useState<string>('Theo ngày');
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [r, setR] = useState<any>([]);

  const handleExportMember = () => {
    exportReportMarketing.run({
      page: String(pagination.page),
      limit: String(pagination.limit),
      start_date: startDate,
      end_date: endDate,
      type_plan: cycle,
    });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date?.toISOString());
  };

  const handleSelectChange = (event: any) => {
    setCycle(event?.target?.value);
  };

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };

  const handleSearch = () => {
    setPagination({
      ...pagination,
      page: 1,
      start_date: startDate,
      end_date: endDate,
      type_plan: cycle,
    });
  };
  ////call api////
  const exportReportMarketing = useExportReportMarketing({
    onSuccess: (buffer) => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      a.download = `báo-cáo-chiến-dịch.xlsx`;
      document.body.appendChild(a);
      a.click();
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
    getListMarketing.run(pagination);
  }, [pagination]);

  return (
    <div>
      <ActionHead title={'Báo cáo thực hiện chiến dịch Marketing'}>
        <Button
          text='Xuất file'
          handleSubmit={handleExportMember}
          isLoading={exportReportMarketing.loading}
        />
      </ActionHead>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchTable>
          <div style={{ display: 'block' }}>
            <div style={{ display: 'flex' }}>
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
              <div style={{ margin: '5px 0px 0px 13px' }}>
                <Button
                  text='Tìm kiếm'
                  bgColor='#FFFFFF'
                  color='black'
                  handleSubmit={handleSearch}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                margin: '30px 0px 50px 0px',
              }}
            >
              <Select
                data={cycleType}
                value={cycle}
                label='Chu kỳ:'
                title='cycle'
                disabled={false}
                right='20px'
                width='240px'
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </SearchTable>
      </div>
      <div>
        <CustomTable
          data={r?.data || []}
          columns={cols}
          currentPage={r?.meta?.currentPage || 1}
          handlePagination={handlePagination}
          totalPage={r?.meta?.totalPages || 1}
        />
      </div>
    </div>
  );
}

export default LogCampaign;
