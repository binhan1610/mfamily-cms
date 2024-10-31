import React, { useEffect, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import Form, { Field } from 'rc-field-form';
import styles from './index.module.scss';
import Button from '@components/Button';
import RadioForward from '@components/Radio';
import {
  Permissions,
  permissionsCustomerService,
  permissionsViewUser,
} from 'src/constants/permisions.constants';
import { useUpdateRoleUser, useViewProfileUser } from '../service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@utils/common';

const EditRole = () => {
  //
  const router = useRouter();
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [listPermission, setListPermission] = useState<string[]>([]);
  const [role, setRole] = useState<any>('');
  const onChange = (permission: any) => {
    const index = checkedValues.indexOf(permission.value);
    if (index === -1) {
      setCheckedValues([...checkedValues, permission.value]);
    } else {
      setCheckedValues([...checkedValues.slice(0, index), ...checkedValues.slice(index + 1)]);
    }
    if (index === -1) {
      setListPermission([...listPermission, permission.view]);
    } else {
      setListPermission([...listPermission.slice(0, index), ...listPermission.slice(index + 1)]);
    }
  };
  //
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Thêm logic xử lý khi form được submit
  };

  const radioRoleOptions = [
    { label: 'View User', value: 'VIEW_USER' },
    { label: 'Chăm sóc khách hàng', value: 'CUSTOMER_SERVICE' },
  ];
  const radioAcessOptions = [{ label: 'Chỉ xem', value: 'only_view' }];

  const handleUpdateRole = () => {
    const payload = {
      user_id: Number(router.query.id),
      role: role,
      listPermission: listPermission,
    };
    updateRoleAccountAdmin.run(payload);
  };
  ///api////

  const profileAccountAdmin = useViewProfileUser({
    onSuccess: (resp) => {
      const role = radioRoleOptions.filter((role) => role.value === resp.data.role.name);
      setRole(role[0].value);
    },
    onError: () => {
      console.log('error');
    },
  });

  const updateRoleAccountAdmin = useUpdateRoleUser({
    onSuccess: (r) => {
      console.log(r);
      toast.success('Chỉnh sửa quyền truy cập thành công');
      router.push({ pathname: ROUTE_PATH.SETTING });
    },
    onError: (e) => {
      console.log(e);
      toast.error('Chỉnh sửa quyền truy cập thất bại');
    },
  });
  ///effect///
  useEffect(() => {
    setCheckedValues([]);
    setListPermission([]);

    if (role === 'VIEW_USER') {
      const updatedListPermission = permissionsViewUser.map((permission) => permission.view);
      setListPermission(updatedListPermission);

      const updatedCheckedValues = permissionsViewUser.map((permission) => permission.value);
      setCheckedValues(updatedCheckedValues);
    }

    if (role === 'CUSTOMER_SERVICE') {
      const updatedListPermission = permissionsCustomerService.map((permission) => permission.view);
      setListPermission(updatedListPermission);

      const updatedCheckedValues = permissionsCustomerService.map((permission) => permission.value);
      setCheckedValues(updatedCheckedValues);
    }
    profileAccountAdmin.run(Number(router.query.id));
  }, [role]);

  return (
    <>
      <ActionHead title='Chỉnh sửa quyền truy cập' />
      <Form form={form} onFinish={onFinish} className={styles.form}>
        <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '60px' }}>
          <label className={styles.label}>Vai trò:</label>
          <Field name='role' rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <div>
              {radioRoleOptions.map((option) => (
                <RadioForward
                  key={option.value}
                  label={option.label}
                  value={role}
                  option={option}
                  onChange={(value: any) => {
                    setRole(value);
                  }}
                />
              ))}
            </div>
          </Field>
        </div>
        <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '60px' }}>
          <label className={styles.label}>Quyền truy cập:</label>
          <Field name='role' rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <div>
              {radioAcessOptions.map((option) => (
                <RadioForward
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  option={option}
                />
              ))}
            </div>
          </Field>
        </div>
        <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '80px' }}>
          <label className={styles.label}>Hiện thị:</label>
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
            {Permissions.map((permission) => (
              <div key={permission.value} style={{ width: '50%', marginBottom: '10px' }}>
                <input
                  type='checkbox'
                  value={permission.value}
                  checked={checkedValues.includes(permission.value)}
                  onChange={() => onChange(permission)}
                />
                <label style={{ marginLeft: '10px' }}>{permission.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button text='Lưu' handleSubmit={handleUpdateRole} />
          <Button
            text='Huỷ'
            isCancel
            handleSubmit={() => {
              router.push({ pathname: ROUTE_PATH.SETTING });
            }}
          />
        </div>
      </Form>
    </>
  );
};

export default EditRole;
