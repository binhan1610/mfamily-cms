import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import RCDatePicker from '@components/DatePicker';
import InputForward from '@components/Input';
import ActionHead from '@layout/components/ActionHead';
import SearchTable from '@layout/components/SearchTable';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { converPhone, convertTime, reConverPhone, useLogConnection } from '../../service';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@utils/common';

interface PaginationState {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  keyword?: string;
  phoneChild?: string;
}
function LogConnection() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [phoneParent, setPhoneParent] = useState<string>();
  const [phoneChild, setPhoneChild] = useState<string>();
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

  const handleChangePhoneChild = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhoneChild(val);
  };

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };

  const handleDetailItem = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.USER_DETAIL_IN_LOG,
      query: { id },
    });
  };

  const handleDetailDisconnect = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.USER_DETAIL_DISCONNECT,
      query: { id },
    });
  };

  const getPath = (data: any) => {
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    return `${pathParts[0]}//${pathParts[2]}/${ROUTE_PATH.USER_DETAIL_IN_LOG}?id=${data}`;
  };

  const getPath1 = (data: any) => {
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    return `${pathParts[0]}//${pathParts[2]}/${ROUTE_PATH.USER_DETAIL_DISCONNECT}?id=${data}`;
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      router.push({
        query: {
          phone_parent: phoneParent,
          ...(keyword && { keyword }),
          ...(startDate && { startDate: startDate }),
          ...(endDate && { endDate: endDate }),
          ...(phoneChild && { phoneChild: phoneChild }),
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
      if (phoneChild) {
        queryParams.phoneChild = reConverPhone(phoneChild);
      }
      getLogConnection.run(queryParams);
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

  const getLogConnection = useLogConnection({
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
      if (router?.query?.phone_child !== undefined) {
        queryParams.keyword = String(router?.query?.phone_child);
      }
      if (router?.query?.phoneChild !== undefined) {
        queryParams.phoneChild = reConverPhone(String(router?.query?.phoneChild));
      }
      getLogConnection.run(queryParams);
    }
  }, [pagination]);

  const cols = [
    {
      title: 'Tên thành viên',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (_: number, record: any) => <>{converPhone(record.phone)}</>,
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_: number, record: any) => (
        <>{record?.created_at ? convertTime(new Date(record?.created_at), '1') : ''}</>
      ),
    },
    {
      title: 'Model thiết bị',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: number, record: any) => (
        <>
          {record?.state === 'CHILDREN_SCAN_QR' ? (
            <a
              href={getPath(record.id)}
              target='_blank'
              rel='noreferrer'
              style={{ color: '#5595FF', textDecoration: 'underline' }}
              onClick={(e) => {
                e.preventDefault();
                handleDetailItem(record.id);
              }}
            >
              Kết nối từ ...
            </a>
          ) : (
            <a
              href={getPath1(record.id)}
              target='_blank'
              rel='noreferrer'
              style={{ color: '#5595FF', textDecoration: 'underline' }}
              onClick={(e) => {
                e.preventDefault();
                handleDetailDisconnect(record.id);
              }}
            >
              Đã gỡ kết nối
            </a>
          )}
        </>
      ),
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
        title={`Lịch sử kết nối - Trưởng nhóm #${
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
                margin: '20px 0px 25px 0px',
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                margin: '0px 0px 25px 0px',
              }}
            >
              <InputForward
                onKeyPress={handleKeyPress}
                label='Số điện thoại thành viên:'
                placeholder='Nhập số điện thoại thành viên'
                type='text'
                onChange={handleChangePhoneChild}
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
          loading={getLogConnection.loading}
        />
      </div>
    </div>
  );
}

export default LogConnection;
