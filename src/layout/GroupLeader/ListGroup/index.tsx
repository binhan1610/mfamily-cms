import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import { useEffect, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import InputSearch from '@components/InputSearch';
import SearchTable from '@layout/components/SearchTable';
import { ROUTE_PATH } from '@utils/common';
import { useRouter } from 'next/router';
import { checkKeyword, converPhone, convertTime, useGetListParent } from '../service';

function ListGroup() {
  const router = useRouter();
  const [r, setR] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    getListParent.run({ ...pagination, page: 1, keyword: checkKeyword(keyword) });
  };

  const handleDetailItem = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.LIST_MEMBER,
      query: { id_lead: converPhone(id) },
    });
  };

  const getPath = (e: any): string => {
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    return `${pathParts[0]}//${pathParts[2]}${ROUTE_PATH.LIST_MEMBER}?id_lead=${converPhone(e)}`;
  };

  const getListParent = useGetListParent({
    onSuccess: (resp) => {
      setR(resp);
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  const cols = [
    {
      title: '#ID Trưởng nhóm',
      dataIndex: 'id',
      key: 'id',
      render: (_: number, record: any) => (
        <a
          href={getPath(record.id)}
          target='_blank'
          rel='noreferrer'
          onClick={(e) => {
            e.preventDefault();
            handleDetailItem(record.id);
          }}
          style={{ color: '#5595FF', textDecoration: 'underline' }}
        >
          {converPhone(record?.id)}
        </a>
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (_: number, record: any) => <div style={{ textAlign: 'left' }}>{record.name}</div>,
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'create',
      key: 'create',
      render: (_: number, record: any) => (
        <>{record?.create ? convertTime(new Date(record?.create), '1') : ''}</>
      ),
    },
    {
      title: 'SL TB chia sẻ gói cước',
      dataIndex: 'tvvt',
      key: 'tvvt',
    },
    {
      title: 'SL thiết bị',
      dataIndex: 'tvtb',
      key: 'tvtb',
    },
  ];
  useEffect(() => {
    getListParent.run({ ...pagination });
  }, [pagination]);
  return (
    <>
      <ActionHead title='Danh sách trưởng nhóm'></ActionHead>
      <SearchTable>
        <>
          <InputSearch
            placeholder='Tìm kiếm bằng tên, số điện thoại, ID trưởng nhóm'
            handleChangeInput={handleChange}
            handleKeyPress={handleKeyPress}
          />
          <Button text='Tìm kiếm' handleSubmit={handleSearch} bgColor='#FFFFFF' color='#000000' />
        </>
      </SearchTable>
      <CustomTable
        data={r?.data?.data || []}
        columns={cols}
        currentPage={r?.data?.meta?.currentPage || 1}
        handlePagination={handlePagination}
        totalPage={r?.data?.meta?.totalPages || 1}
        loading={getListParent.loading}
      />
    </>
  );
}

export default ListGroup;
