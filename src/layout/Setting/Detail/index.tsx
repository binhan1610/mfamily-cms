import React, { useEffect, useRef, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import Form, { Field } from 'rc-field-form';
import styles from './index.module.scss';
import Button from '@components/Button';
import RadioForward from '@components/Radio';
import FormItem from '@components/FormItem';
import InputForward from '@components/Input';
import { ROUTE_PATH, TYPE } from '@utils/common';
import SettingPassword from './SettingPassword';
import { useRouter } from 'next/router';
import Modal from '@components/Modal';
import { useDeleteUser, useViewProfileUser } from '../service';
import { Role, Roles } from 'src/constants/roles.constants';
import { toast } from 'react-toastify';

type ModalDeleteUser = React.ElementRef<typeof Modal>;
type ModalDeleteSuccess = React.ElementRef<typeof Modal>;

const TYPE_SETTING = {
  FORM_USER: 'FORM_USER',
  SET_PASSWORD: 'SET_PASSWORD',
};

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

const AddUser = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const refModalDeleteUser = useRef<ModalDeleteUser>(null);
  const refModalDeleteSuccess = useRef<ModalDeleteSuccess>(null);
  const [typeRole, setTypeRole] = useState<any>('');
  const [isScreen, setIsScreen] = useState<string>(TYPE_SETTING.FORM_USER);
  const [formUser] = useState();
  const changeScreen = () => setIsScreen(TYPE_SETTING.FORM_USER);

  const handleChangeRole = (value: string) => {
    setTypeRole(value);
    form.setFieldValue('role', value);
  };

  const handleSubmitPassword = (pass: string) => {
    //submit create user
    console.log('form', formUser, pass, typeRole);
  };

  const handleDeleteAccount = () => {
    refModalDeleteUser.current?.toggleModal();
  };

  const deleteAccoutAdmin = useDeleteUser({
    onSuccess: (resp) => {
      if (resp) {
        toast.success('delete user success');
        refModalDeleteSuccess.current?.toggleModal();
        refModalDeleteUser.current?.toggleModal();
        router.push({ pathname: ROUTE_PATH.SETTING });
      }
    },
    onError: (r) => {
      console.log('error', r);
      refModalDeleteSuccess.current?.toggleModal();
      refModalDeleteUser.current?.toggleModal();
    },
  });

  const handleDeleteUser = () => {
    deleteAccoutAdmin.run({ user_id: Number(router.query.id) });

    //call api delete user
  };

  const handleResetPassword = () => {
    setIsScreen(TYPE_SETTING.SET_PASSWORD);
  };

  const handleEditPermission = () => {
    router.push({
      pathname: ROUTE_PATH.SETTING_EDIT_ROLE,
      query: { id: router.query.id },
    });
  };

  const profileAccountAdmin = useViewProfileUser({
    onSuccess: (resp) => {
      const role = Roles.filter((role) => role.value === resp.data.role.name);
      setTypeRole(role[0]);
      form.setFieldValue('center_id', resp.data.center_id);
      form.setFieldValue('first_name', resp.data.first_name);
      form.setFieldValue('last_name', resp.data.last_name);
      form.setFieldValue('email', resp.data.email);
      form.setFieldValue('description', resp.data.description);
      form.setFieldValue('user_name', resp.data.user_name);
    },
    onError: () => {
      console.log('error');
    },
  });

  useEffect(() => {
    profileAccountAdmin.run(Number(router.query.id));
  }, []);

  return (
    <>
      <ActionHead title='Thông tin người dùng'>
        <Button text='Đặt lại mật khẩu' handleSubmit={handleResetPassword} />
      </ActionHead>

      {isScreen === TYPE_SETTING.FORM_USER ? (
        <div className={styles.form}>
          <div className={styles.formRadio}>
            <label className={styles.label}>Vai trò:</label>
            <Field name='role' rules={[{ required: true }]}>
              <div className={styles.radioGroup}>
                <RadioForward
                  key={typeRole.value}
                  label={typeRole.label}
                  option={typeRole}
                  value={typeRole.value}
                  onChange={handleChangeRole}
                  disabled
                />
              </div>
            </Field>
          </div>
          <Form form={form} className={styles.fromGroup}>
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
                <InputForward
                  label={item.label}
                  placeholder={item.label}
                  type='text'
                  isRequired
                  disabled
                />
              </FormItem>
            ))}
          </Form>

          <div className={styles.buttonContainer}>
            {typeRole.value === Role.SUPER_ADMIN ? (
              <Button
                text='Chỉnh sửa quyền truy cập'
                type='submit'
                handleSubmit={handleEditPermission}
                isDisabled
                bgColor='#B2ADAD'
              />
            ) : (
              <Button
                text='Chỉnh sửa quyền truy cập'
                type='submit'
                handleSubmit={handleEditPermission}
              />
            )}
            <Button text='Xoá tài khoản' isCancel handleSubmit={handleDeleteAccount} />
          </div>
        </div>
      ) : (
        <SettingPassword handleSubmitPass={handleSubmitPassword} changeScreen={changeScreen} />
      )}
      <Modal ref={refModalDeleteUser} widthModal={450} handleSubmit={handleDeleteUser}>
        <div>Bạn chắc chắn muốn Gỡ kết nối của thành viên?</div>
      </Modal>

      <Modal ref={refModalDeleteSuccess} widthModal={450} isClose={true}>
        <div>Xoá tài khoản thành công</div>
      </Modal>
    </>
  );
};

export default AddUser;
