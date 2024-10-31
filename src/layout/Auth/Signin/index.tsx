import React from 'react';
import Form, { Field } from 'rc-field-form/es';
import styles from './signin.module.scss';
import { useAuth } from '@store/auth/useAuth';
import { useLogin } from './service';
import { toast } from 'react-toastify';
import Button from '@components/Button';

interface IsLogin {
  username: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const { onLogin } = useAuth();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onFinish;
    }
  };

  const requestLogin = useLogin({
    onSuccess: (r) => {
      r = r.data;
      if (!r?.token) {
        return;
      } else {
        onLogin({
          id: r?.id_user,
          token: r?.token || '',
          expiredTime: r?.expired_time || 0,
          refreshToken: r?.refresh_token,
        });
      }
    },
    onError: (err) => {
      // if (Array.isArray(err?.errors)) {
      //   for (const errItem of err.errors) {
      //     switch (errItem) {
      //       case 'user.notFound':
      //         return toast.error(`account_does_not_exist`, {
      //           theme: 'colored',
      //         });

      //       default:
      //         return toast.error(`username_pass_incorrect`, { theme: 'colored' });
      //     }
      //   }
      // }
      // return
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const onFinish = (values: IsLogin) => {
    requestLogin.run({ ...values });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={'/static/images/mobifone_logo.png'} alt={'logo-mobi'} width={764} height={429} />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.imageForm}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='206'
            height='206'
            viewBox='0 0 206 206'
            fill='none'
          >
            <circle cx='103' cy='103' r='103' fill='url(#paint0_radial_816_285)' />
            <path
              d='M103.702 103.703C114.989 103.703 124.139 94.5534 124.139 83.2666C124.139 71.9798 114.989 62.8301 103.702 62.8301C92.4154 62.8301 83.2656 71.9798 83.2656 83.2666C83.2656 94.5534 92.4154 103.703 103.702 103.703Z'
              stroke='white'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M138.81 144.574C138.81 128.756 123.074 115.963 103.7 115.963C84.3259 115.963 68.5898 128.756 68.5898 144.574'
              stroke='white'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <defs>
              <radialGradient
                id='paint0_radial_816_285'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(103 103) rotate(90) scale(103)'
              >
                <stop stopColor='#ED1C24' />
                <stop offset='1' stopColor='white' />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div>
          <Form
            form={form}
            name='loginForm'
            initialValues={{
              username: '',
              password: '',
            }}
            onFinish={onFinish}
            className={styles.form}
          >
            <div style={{ width: '100%' }}>
              <Field
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập!',
                  },
                ]}
              >
                <div className={styles.inputContainer}>
                  <img
                    src={'/static/images/user.png'}
                    alt={'user'}
                    width={20}
                    height={20}
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                  <input className={styles.input} placeholder='Tên đăng nhập' />
                </div>
              </Field>
              <Field
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <div className={styles.inputContainer}>
                  <img src={'/static/images/lock.png'} alt={'user'} width={20} height={20} />
                  <input className={styles.input} type='password' placeholder='Mật khẩu' />
                </div>
              </Field>
              <Button
                type='submit'
                text='Đăng nhập'
                isLoading={requestLogin.loading}
                handleKeyPress={handleKeyPress}
              />
            </div>
          </Form>
        </div>
      </div>
      <div className={styles.cycle_blue}></div>
      <div className={styles.cycle_red}></div>
    </div>
  );
};

export default Login;
