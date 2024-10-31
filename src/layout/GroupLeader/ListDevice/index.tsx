import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import { IData, data } from '@layout/data';
import { useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import InputSearch from '@components/InputSearch';
import SearchTable from '@layout/components/SearchTable';
import { ROUTE_PATH } from '@utils/common';
import { useRouter } from 'next/router';

function ListDevice() {
  const router = useRouter();
  const [pagination, setPagination] = useState({ page: 1, limit: 10, txtSearch: '' });
  const { page } = pagination;
  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPagination({ ...pagination, txtSearch: val });
  };

  const handleSearch = () => {};

  const handleDetailItem = (id: number) => {
    router.push({
      pathname: ROUTE_PATH.LIST_MEMBER,
      query: { id_lead: id },
    });
  };

  const cols = [
    {
      title: '#ID Trưởng nhóm',
      dataIndex: 'id',
      key: 'id',
      render: (_: number, record: IData) => (
        <div
          onClick={() => handleDetailItem(record.id)}
          style={{ color: '#5595FF', textDecoration: 'underline' }}
        >
          {record?.id}
        </div>
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'package_name',
      key: 'package_name',
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'SL TB chia sẻ gói cước',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'SL thiết bị',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (_: number, record: IData) => <>{record?.buyer || record?.buyer_username}</>,
    },
  ];

  return (
    <>
      <ActionHead title='Danh sách trưởng nhóm'></ActionHead>
      <SearchTable>
        <>
          <InputSearch
            placeholder='Tìm kiếm bằng tên, số điện thoại, ID trưởng nhóm'
            handleChangeInput={handleChange}
          />
          <Button text='Tìm kiếm' handleSubmit={handleSearch} />
        </>
      </SearchTable>
      <CustomTable
        data={data}
        columns={cols}
        currentPage={page}
        handlePagination={handlePagination}
        totalPage={10}
        loading={false}
      />
    </>
  );
}

export default ListDevice;
