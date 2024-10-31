import React, { useState } from 'react';
import { initCheckShowPass, initError, initInput } from '@utils/type';
import ViewPassWord from './ViewPassWord';
import { useAdminUpdatePassword } from '../service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@utils/common';

interface NewPasswordProps {
  handleSubmitPass: (pass: string) => void;
  changeScreen: () => void;
  loading?: boolean;
}

function NewPassword(props: NewPasswordProps) {
  const router = useRouter();
  const { changeScreen } = props;
  const [show, setShow] = useState(initCheckShowPass);
  const [input, setInput] = useState(initInput);
  const [error, setError] = useState(initError);

  const adminUpdatePassword = useAdminUpdatePassword({
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu người dùng thành công', { theme: 'colored' });
      router.push({ pathname: ROUTE_PATH.SETTING });
    },
    onError: () => {
      toast.error('Đặt lại mật khẩu người dùng thất bại', { theme: 'colored' });
    },
  });

  const handleSubmit = () => {
    if (!error.password && !error.confirmPassword && input.password && input.confirmPassword) {
      adminUpdatePassword.run({ user_id: Number(router.query.id), new_password: input.password });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' } as any;

      switch (name) {
        case 'password':
          if (!value) {
            stateObj[name] = 'Vui lòng nhập mật khẩu';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = 'Mật khẩu không khớp';
          } else if (value?.length < 8) {
            stateObj[name] = 'Mật khẩu phải có 8 ký tự trở nên';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Vui lòng xác nhận mật khẩu';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'Mật khẩu không khớp';
          } else if (value?.length < 8) {
            stateObj[name] = 'Mật khẩu phải có 8 ký tự trở nên';
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  };
  return (
    <ViewPassWord
      show={show}
      input={input}
      error={error}
      setShow={setShow}
      onInputChange={onInputChange}
      handleKeyPress={handleKeyPress}
      validateInput={validateInput}
      handleSubmit={handleSubmit}
      changeScreen={changeScreen}
    />
  );
}

export default NewPassword;
