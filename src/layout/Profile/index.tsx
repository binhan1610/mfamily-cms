import React from 'react';
import ActionHead from '@layout/components/ActionHead';
import Form, { Field } from 'rc-field-form';
import styles from './index.module.scss';
import Button from '@components/Button';
import RadioForward from '@components/Radio';

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Thêm logic xử lý khi form được submit
  };

  const radioOptions = [
    { label: 'Super Admin', value: 'super_admin' },
    { label: 'View User', value: 'view_user' },
    { label: 'Chăm sóc khách hàng', value: 'customer_care' },
  ];
  return (
    <>
      <ActionHead title='Chỉnh sửa thông tin người dùng' />
      <h1 style={{ fontSize: '20px', marginBottom: '30px' }}>1. Thông tin người dùng</h1>
      <div style={{ marginBottom: '10px' }}>
        Thông tin người dùng hiện tại
        <Form form={form} onFinish={onFinish} className={styles.form}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label className={styles.label}>Vai trò:</label>
            <Field name='role' rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
              <div className={styles.radioGroup}>
                {radioOptions.map((option) => (
                  <RadioForward
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    option={option}
                    onChange={(value: any) => form.setFieldsValue({ role: value })}
                  />
                ))}
              </div>
            </Field>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>
              Mã trung tâm :<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Mã trung tâm phụ:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Mã nhân viên:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Loại cửa hàng:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Tên:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Họ:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Email:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Số điện thoại:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Mô tả:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>
              Tên đăng nhập:<span style={{ color: 'red' }}>*</span>
            </label>
            <Field
              name='center_code'
              rules={[{ required: true, message: 'Vui lòng nhập mã trung tâm!' }]}
            >
              <input className={styles.input} />
            </Field>
          </div>

          <div className={styles.buttonContainer}>
            <Button text='Lưu và tiếp tục' />
            <Button text='Huỷ' customStyle={{ color: 'black', backgroundColor: '#F5F5F5' }} />
          </div>
        </Form>
      </div>
    </>
  );
};

export default Profile;
