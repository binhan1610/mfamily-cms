import ActionHead from '@layout/components/ActionHead';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './group-leader.module.scss';
import Button from '@components/Button';
import { ROUTE_PATH } from '@utils/common';
import { converPhone, convertTime, formatDate, useDetailUserInLog } from './service';
function UserDetailInLog() {
  const router = useRouter();
  const [r, setR] = useState<any>([]);
  const handleGoBack = () => {
    router.push({ pathname: ROUTE_PATH.LIST_MEMBER, query: { id_lead: converPhone(r.parent_id) } });
  };
  const detailTVTB = useDetailUserInLog({
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
      <ActionHead title='Thông tin thành viên được kết nối thiết bị'>
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
            <div className={styles.text_row}>Thời gian kết nối</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Ip thiết bị</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Mã kết nối</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>SĐT yêu cầu ghép nối</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>Thiết bị yêu cầu ghép nối</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>
              Đồng ý với điều khoản sự dụng và chính sách bảo mật của MobiFone
            </div>
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
              {r?.time_connect ? convertTime(new Date(r?.time_connect), '1') : ''}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.ip_device}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.qr_code}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>
              {r?.phone_request_connect && converPhone(r?.phone_request_connect)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>{r?.device_request_connect}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.text_row}>
              {r?.confirmation_time && (
                <>Đã chấp nhận {r?.confirmation_time ? formatDate(r?.confirmation_time) : ''}</>
              )}
            </div>
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

export default UserDetailInLog;
