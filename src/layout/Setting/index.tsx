import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import { useEffect, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import InputSearch from '@components/InputSearch';
import SearchTable from '@layout/components/SearchTable';
import { ROUTE_PATH } from '@utils/common';
import { useRouter } from 'next/router';
import { useViewUser } from './service';
import { useGetMyProfile } from '@layout/Marketing/service';

interface PaginationState {
  page: number;
  limit: number;
  keyword?: string;
}

const cols = [
  {
    title: 'Tên',
    dataIndex: 'first_name',
    key: 'first_name',
    render: (_: number, record: any) => (
      <div style={{ color: '#5595FF' }}>
        {record?.last_name}
        <> </>
        {record?.first_name}
      </div>
    ),
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (_: number, record: any) => <>{record.role?.name}</>, // Sửa render để chấp nhận đúng kiểu
  },
];
function Home() {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [keyword, setKeyword] = useState<string>('');
  const [check, setCheck] = useState(true);
  const [r, setR] = useState<any>([]);
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
    router.push({
      query: {
        keyword: keyword,
      },
    });
    setPagination({ ...pagination, page: 1, keyword: keyword });
  };

  const handleAddUser = () => {
    router.push(ROUTE_PATH.SETTING_ADD_USER);
  };

  const handleDetailItem = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.SETTING_DETAIL,
      query: { id },
    });
  };
  /////api/////////
  const listAdminAccount = useViewUser({
    onSuccess: (resp) => {
      setR(resp);
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getMyProfile = useGetMyProfile({
    onSuccess: (resp) => {
      if (resp.data) {
        const permissions = resp.data.role.permissions;
        const checkRole = permissions.some((p: any) => p.apis.includes('View_Settings'));
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

  useEffect(() => {
    getMyProfile.run();
    const queryParams: any = {
      ...pagination,
    };
    if (router?.query?.keyword !== undefined) {
      queryParams.keyword = String(router?.query?.keyword);
    }
    listAdminAccount.run(queryParams);
  }, [pagination]);

  return (
    <>
      {check ? (
        <>
          <ActionHead title='Danh sách quản trị viên hệ thống'>
            <Button text='Thêm người dùng' handleSubmit={handleAddUser} />
          </ActionHead>
          <SearchTable>
            <>
              <InputSearch
                handleKeyPress={handleKeyPress}
                placeholder='Tìm kiếm bằng tên người dùng, số điện thoại'
                handleChangeInput={handleChange}
              />
              <Button
                text='Tìm kiếm'
                handleSubmit={handleSearch}
                bgColor='#FFFFFF'
                color='#000000'
              />
            </>
          </SearchTable>
          <CustomTable
            data={r?.data?.data || []}
            columns={cols}
            currentPage={r?.data?.meta?.currentPage || 1}
            handlePagination={handlePagination}
            totalPage={r?.data?.meta?.totalPages || 1}
            loading={listAdminAccount.loading}
            handleDetailItem={handleDetailItem}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>Không có quyền truy cập</div>
      )}
    </>
  );
}

export default Home;
