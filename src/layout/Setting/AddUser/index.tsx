import React, { useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import Form, { Field } from 'rc-field-form';
import styles from './index.module.scss';
import Button from '@components/Button';
import RadioForward from '@components/Radio';
import Breadcrumb from '@components/Beardcrumb';
import FormItem from '@components/FormItem';
import InputForward from '@components/Input';
import { ROUTE_PATH, TYPE } from '@utils/common';
import SettingPassword from './SettingPassword';
import { useRouter } from 'next/router';
import { useCheckUser, useCreateUser } from '../service';
import { toast } from 'react-toastify';

const TYPE_SETTING = {
  FORM_USER: 'FORM_USER',
  SET_PASSWORD: 'SET_PASSWORD',
};

const radioOptions = [
  { label: 'Super Admin', value: 'SUPER_ADMIN' },
  { label: 'View User', value: 'VIEW_USER' },
  { label: 'Chăm sóc khách hàng', value: 'CUSTOMER_SERVICE' },
];

const itemOptions = [
  {
    label: 'Mã trung tâm',
    name: 'center_id',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Tên',
    name: 'first_name',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Họ',
    name: 'last_name',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Email',
    name: 'email',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Số điện thoại',
    name: 'phone',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Mô tả',
    name: 'description',
    required: true,
    type: TYPE.TEXT,
  },
  {
    label: 'Tên đăng nhập',
    name: 'user_name',
    required: true,
    type: TYPE.TEXT,
  },
];

interface AddUserProps {
  role: string;
  center_id: string;
  sub_center_id: string;
  employee_id: string;
  store_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description: string;
  user_name: string;
  pass_word: string;
}

const AddUser = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [typeRole, setTypeRole] = useState<string>('');
  const [isScreen, setIsScreen] = useState<string>(TYPE_SETTING.FORM_USER);
  const [formUser, setFormUser] = useState<AddUserProps>({} as AddUserProps);
  const [check, setCheck] = useState<Boolean>(false);
  const onFinish = (values: any) => {
    checkUser.run({ email: values.email, user_name: values.user_name });
    if (check) {
      setFormUser(values);
      setIsScreen(TYPE_SETTING.SET_PASSWORD);
    }
  };

  const changeScreen = () => setIsScreen(TYPE_SETTING.FORM_USER);

  const handleChangeRole = (value: string) => {
    setTypeRole(value);
    form.setFieldValue('role', value);
  };
  ///call api/////
  const createUser = useCreateUser({
    onSuccess: () => {
      router.push(ROUTE_PATH.SETTING);
      toast.success('Tạo user thành công', { theme: 'colored' });
    },
    onError: () => {
      toast.error('Tạo user thất bại', { theme: 'colored' });
    },
  });

  const checkUser = useCheckUser({
    onSuccess: () => {
      setCheck(true);
    },
    onError: (e) => {
      toast.error(e?.message, { theme: 'colored' });
    },
  });

  ///call api/////
  const handleSubmitPassword = (pass: string) => {
    createUser.run({ ...formUser, role: typeRole, pass_word: pass });
  };

  const handleCancelForm = () => {
    router.push(ROUTE_PATH.SETTING);
    form.resetFields();
  };

  return (
    <>
      <ActionHead title='Thêm người dùng mới' />
      <Breadcrumb
        routeSegments={[
          {
            name: '1. Thêm người dùng',
            path: '',
            active: isScreen === TYPE_SETTING.FORM_USER,
          },
          {
            name: '2. Đặt mật khẩu',
            path: '',
            active: isScreen === TYPE_SETTING.SET_PASSWORD,
          },
        ]}
      />

      <div className={styles.fillInfoUser}>
        {isScreen === TYPE_SETTING.FORM_USER
          ? 'Điền các thông tin của người dùng để tạo một tài khoản, mật khẩu sẽ được cài đặt sau đó'
          : 'Bạn có thể đặt mật khẩu tại đây và chỉnh sửa lại mật khẩu tại trang người dùng.'}
      </div>
      {isScreen === TYPE_SETTING.FORM_USER ? (
        <Form form={form} onFinish={onFinish} className={styles.form}>
          <div className={styles.formRadio}>
            <label className={styles.label}>Vai trò:</label>
            <Field name='role' rules={[{ required: true }]}>
              <div className={styles.radioGroup}>
                {radioOptions.map((option) => (
                  <RadioForward
                    key={option.value}
                    label={option.label}
                    option={option}
                    value={typeRole}
                    onChange={handleChangeRole}
                  />
                ))}
              </div>
            </Field>
          </div>
          <div className={styles.fromGroup}>
            {itemOptions.map((item) => (
              <FormItem
                name={item.name}
                className={styles.formItem}
                rules={[
                  {
                    required: item.required,
                    message: 'Vui lòng nhập',
                  },
                ]}
                key={item.name}
              >
                <InputForward label={item.label} placeholder={item.label} type='text' isRequired />
              </FormItem>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <Button text='Lưu và tiếp theo' type='submit' />
            <Button text='Huỷ' isCancel handleSubmit={handleCancelForm} />
          </div>
        </Form>
      ) : (
        <SettingPassword
          handleSubmitPass={handleSubmitPassword}
          changeScreen={changeScreen}
          loading={createUser.loading}
        />
      )}
    </>
  );
};

export default AddUser;
