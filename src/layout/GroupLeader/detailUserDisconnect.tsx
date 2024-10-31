import ActionHead from '@layout/components/ActionHead';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './group-leader.module.scss';
import Button from '@components/Button';
import { ROUTE_PATH } from '@utils/common';
import { converPhone, convertTime, useDetailUserDisconnect } from './service';
function UserDetailDisconnect() {
  const router = useRouter();
  const [r, setR] = useState<any>([]);
  const handleGoBack = () => {
    router.push({ pathname: ROUTE_PATH.LIST_MEMBER, query: { id_lead: converPhone(r.parent_id) } });
  };
  const detailTVTB = useDetailUserDisconnect({
    onSuccess: (resp) => {
      setR(resp.data);
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  useEffect(() => {
    if (router?.query?.id) {
      detailTVTB.run(Number(router?.query?.id));
    }
  }, [router?.query?.id]);
  return (
    <div>
      <ActionHead title='Thông tin thành viên đã gỡ kết nối thiết bị'>
        <Button text='Trở lại' bgColor='var(--Button-2, #5595FF)' handleSubmit={handleGoBack} />
      </ActionHead>
      <div className={styles.titleMember}>Trưởng nhóm {converPhone(r?.parent_id) || '#####'}</div>
      <div className={styles.two_columns_container}>
        <div className={styles.column1}>
          <div className={styles.row}>
            <div className={styles.text_row} style={{ fontWeight: 'bold' }}>
              Thông tin
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Tên thành viên</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Model thiết bị</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Trạng thái</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Thời gian gỡ kết nối</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Gỡ kết nối bởi</div>
          </div>
          {/* Thêm thông tin thành viên và thời gian logic vào đây nếu cần */}
        </div>
        <div className={styles.column2}>
          <div className={styles.row}>
            <div className={styles.text_row} style={{ fontWeight: 'bold' }}>
              Chi Tiết
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.full_name}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.model_device}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.status}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>
              {r?.time_disconnect ? convertTime(new Date(r?.time_disconnect), '1') : ''}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.disconnect_by}</div>
          </div>
        </div>
      </div>
      <div className={styles.documentation}>
        Tham khảo{' '}
        <a
          href='https://www.mobifone.vn/dieu-khoan-su-dung'
          style={{ color: '#5595FF' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          điều khoản sử dụng
        </a>{' '}
        và
        <a
          href=' https://www.mobifone.vn/bao-mat-thong-tin'
          style={{ color: '#5595FF' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          chính sách bảo mật
        </a>{' '}
        của MobiFone
      </div>
    </div>
  );
}

export default UserDetailDisconnect;
