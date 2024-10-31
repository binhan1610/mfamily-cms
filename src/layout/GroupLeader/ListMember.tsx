import Button from '@components/Button';
import CustomTable from '@components/CustomTable';
import { useEffect, useRef, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import InputSearch from '@components/InputSearch';
import SearchTable from '@layout/components/SearchTable';
import { ROUTE_PATH } from '@utils/common';
import { useRouter } from 'next/router';
import styles from './group-leader.module.scss';
import Modal from '@components/Modal';
import {
  converPhone,
  convertTime,
  useDisconectionTVTB,
  useExport,
  useGetListUserGroup,
  reConverPhone,
  checkKeyword,
} from './service';
import { toast } from 'react-toastify';
interface PaginationState {
  page: number;
  limit: number;
  phone?: string;
  keyword?: string;
}
type ModalDisconnectDevice = React.ElementRef<typeof Modal>;

function ListMember() {
  const router = useRouter();
  const refDisconnectDevice = useRef<ModalDisconnectDevice>(null);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [phone, setPhone] = useState<string>(String());
  const [keyword, setKeyword] = useState<string>();
  const [idParent, setIdParent] = useState<string>();
  const [idDevice, setIdDevice] = useState<number | null>(null);
  const [r, setR] = useState<any>([]);
  const { page } = pagination;
  const handlePagination = (page: number) => {
    setPagination({ ...pagination, page: page });
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (keyword && phone) {
      const checkPhone = reConverPhone(phone);
      const check = checkKeyword(keyword);

      if (check && checkPhone) {
        router.push({ query: { id_lead: phone, keyword } });
        setPagination({
          ...pagination,
          page: 1,
          phone: checkPhone,
          keyword: check,
        });
      }
    } else if (keyword) {
      const check = checkKeyword(keyword);
      if (check) {
        router.push({ query: { keyword } });
        setPagination({
          page: 1,
          limit: pagination.limit,
          keyword: check,
        });
      }
    } else if (phone) {
      const checkPhone = reConverPhone(phone);

      if (checkPhone) {
        router.push({ query: { id_lead: phone } });
        setPagination({
          page: 1,
          limit: pagination.limit,
          phone: checkPhone,
        });
      }
    }
  };
  const getPath = (data: any) => {
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    return `${pathParts[0]}//${pathParts[2]}/${ROUTE_PATH.USER_DETAIL}?id=${data}`;
  };
  //view detail info member
  const handleDetailItem = (id: string) => {
    router.push({
      pathname: ROUTE_PATH.USER_DETAIL,
      query: { id },
    });
  };

  const handleDisconnect = (id: number) => {
    setIdDevice(id);
    refDisconnectDevice.current?.toggleModal();
    //set state id
  };

  const handleSubmitDisconnect = () => {
    disconnection.run(Number(idDevice));
  };

  const handleExportMember = () => {
    if (!router.query.id_lead && !router.query.keyword) {
      toast.error('không có đã dữ liệu để suất file xslx');
    } else {
      exportMember.run({
        ...pagination,
        keyword: router.query.keyword && checkKeyword(String(router.query.keyword)),
        phone: router.query.id_lead && reConverPhone(String(router.query.id_lead)),
      });
    }
  };

  const cols = [
    {
      title: 'Tên',
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
      dataIndex: 'type_owner',
      key: 'type_owner',
      render: (_: number, record: any) => <>{record?.devices[0]?.model}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (_: number, record: any) => (
        <>
          {record?.devices && record?.devices.length > 0 ? (
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
            <div>Hoạt động</div>
          )}
        </>
      ),
    },
    {
      title: 'Vị trí mới nhất',
      dataIndex: 'ref_id',
      key: 'ref_id',
      render: (_: number, record: any) => {
        const device = record?.devices && record.devices[0];
        const location = device?.locations && device.locations[0];
        if (location) {
          return location.address || `Latitude: ${location.lat}, Longitude: ${location.long}`;
        }
        return null;
      },
    },

    {
      title: 'Cập nhật lúc',
      dataIndex: 'purchase_status',
      key: 'purchase_status',
      render: (_: number, record: any) => (
        <>
          {(record?.devices &&
            record.devices[0]?.locations &&
            record.devices[0].locations[0]?.time_sent &&
            convertTime(new Date(record.devices[0].locations[0]?.time_sent), '1')) ||
            null}
        </>
      ),
    },
    {
      title: 'Gỡ thiết bị',
      dataIndex: 'action',
      key: 'action',
      render: (_: number, record: any) => (
        <div>
          {record?.devices && record?.devices.length > 0 && (
            <div
              onClick={() => handleDisconnect(record.id)}
              style={{ color: '#5595FF', textDecoration: 'underline' }}
            >
              Gỡ kết nối
            </div>
          )}
        </div>
      ),
    },
  ];
  //call api
  const exportMember = useExport({
    onSuccess: async (buffer) => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      a.download = `danh-sach-thanh-vien.xlsx`;
      document.body.appendChild(a);
      a.click();
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  const listUserGroup = useGetListUserGroup({
    onSuccess: (resp) => {
      setR(resp);
      if (router.query?.id_lead) {
        setIdParent(String(router.query.id_lead));
        return;
      }
      if (resp?.data?.data.length === 1) {
        setIdParent(resp.data.data[0].parent.phone || '#####');
        return;
      }
      if (resp?.data?.data.length > 1 && resp.data.data[0].parent) {
        if (/\D/.test(String(router.query.keyword))) {
          setIdParent('#####');
        } else {
          setIdParent(resp.data.data[0].parent.phone);
        }
        return;
      }
    },
    onError: (e) => {
      toast.error('Không tìm thấy thông tin');
      console.log('error', e);
      setIdParent('#####');
      setR([]);
    },
  });

  const disconnection = useDisconectionTVTB({
    onSuccess: (resp) => {
      if (resp.data) {
        toast.success('gỡ kết nối thành viên thiết bị thành công');
        if (router.query.id_lead) {
          setPagination({
            page: 1,
            limit: 10,
            phone: reConverPhone(String(router?.query?.id_lead)),
          });
        }
        refDisconnectDevice.current?.toggleModal();
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  useEffect(() => {
    const phone = router.query?.id_lead ? reConverPhone(String(router.query.id_lead)) : undefined;
    const keyword = router.query?.keyword ? checkKeyword(String(router.query.keyword)) : undefined;
    listUserGroup.run({
      ...pagination,
      phone,
      keyword,
    });
  }, [pagination, router.query.id_lead, router.query.keyword]);

  return (
    <>
      <ActionHead title='Danh sách thành viên'>
        <Button
          text='Xuất danh sách'
          handleSubmit={handleExportMember}
          isLoading={exportMember.loading}
        />
      </ActionHead>
      <SearchTable>
        <>
          <InputSearch
            placeholder='Tìm kiếm bằng SĐT trưởng nhóm'
            handleChangeInput={handleChangePhone}
            handleKeyPress={handleKeyPress}
          />
          <InputSearch
            placeholder='Nhập SĐT, tên thành viên kết nối'
            handleChangeInput={handleChangeKeyword}
            handleKeyPress={handleKeyPress}
          />
          <Button text='Tìm kiếm' handleSubmit={handleSearch} color='black' bgColor='white' />
        </>
      </SearchTable>
      <div className={styles.titleMember}>Trưởng nhóm {converPhone(idParent)}</div>
      <CustomTable
        data={r?.data?.data || []}
        columns={cols}
        currentPage={page}
        handlePagination={handlePagination}
        totalPage={r?.data?.meta?.totalPages || 1}
        loading={listUserGroup.loading}
      />
      <Modal ref={refDisconnectDevice} widthModal={450} handleSubmit={handleSubmitDisconnect}>
        <div>Bạn chắc chắn muốn Gỡ kết nối của thành viên?</div>
      </Modal>
    </>
  );
}

export default ListMember;
