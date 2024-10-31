import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import RCDatePicker from '@components/DatePicker';
import InputForward from '@components/Input';
import ActionHead from '@layout/components/ActionHead';
import SearchTable from '@layout/components/SearchTable';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { convertTime, reConverPhone, useLogNotification } from '../../service';
import { toast } from 'react-toastify';
interface PaginationState {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}
function LogNotification() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [phoneParent, setPhoneParent] = useState<string>();
  const [keyword, setKeyword] = useState<string>(String());
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [r, setR] = useState<any>([]);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date?.toISOString());
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
  };

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      router.push({
        query: {
          phone_parent: phoneParent,
          ...(keyword && { keyword }),
          ...(startDate && { startDate: startDate }),
          ...(endDate && { endDate: endDate }),
        },
      });
      const queryParams: any = {
        page: 1,
        limit: 10,
        phone: reConverPhone(String(router?.query?.phone_parent)),
      };
      queryParams.startDate = startDate;
      queryParams.endDate = endDate;
      if (keyword) {
        queryParams.keyword = keyword;
      }
      getLogNotification.run(queryParams);
    } else {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  ////call api////
  const getLogNotification = useLogNotification({
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
    if (router?.query?.phone_parent) {
      setPhoneParent(String(router?.query?.phone_parent));
      const queryParams: any = {
        ...pagination,
        phone: reConverPhone(String(router?.query?.phone_parent)),
      };
      if (router?.query?.startDate !== undefined) {
        queryParams.startDate = decodeURIComponent(String(router?.query?.startDate));
      }
      if (router?.query?.endDate !== undefined) {
        queryParams.endDate = decodeURIComponent(String(router?.query?.endDate));
      }
      if (router?.query?.keyword !== undefined) {
        queryParams.keyword = String(router?.query?.keyword);
      }
      getLogNotification.run(queryParams);
    }
  }, [pagination]);

  const cols = [
    {
      title: 'Tên thành viên',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Model thiết bị',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Lọai thông báo',
      dataIndex: 'type',
      key: 'type',
      render: (_: number, record: any) => <>{record.type}</>,
    },
    {
      title: 'Nội dung thông báo',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Cập nhật lúc',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_: number, record: any) => (
        <>{record?.updated_at ? convertTime(new Date(record?.updated_at), '1') : ''}</>
      ),
    },
  ];
  return (
    <div>
      <ActionHead
        title={`Lịch sử thông báo - Trưởng nhóm #${
          phoneParent || (router?.query.phone_parent && router?.query?.phone_parent)
        }`}
      ></ActionHead>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchTable>
          <div style={{ display: 'block' }}>
            <div style={{ display: 'flex' }}>
              <RCDatePicker
                handleKeyPress={handleKeyPress}
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
                  top='6px'
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
              <InputForward
                onKeyPress={handleKeyPress}
                label='Tên thành viên được kết nối:'
                placeholder='Nhập tên thành viên'
                type='text'
                onChange={handleChangeKeyword}
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
          loading={getLogNotification.loading}
        />
      </div>
    </div>
  );
}

export default LogNotification;
