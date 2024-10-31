import React, { useState } from 'react';
import { initCheckShowPass, initError, initInput } from '@utils/type';
import ViewPassWord from './ViewPassWord';
import ActionHead from '@layout/components/ActionHead';
import TextStyles from '@components/TextStyle';
import { useUpdatePassword } from './service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@utils/common';

function UserUpdatePassword() {
  const router = useRouter();
  const [show, setShow] = useState(initCheckShowPass);
  const [input, setInput] = useState(initInput);
  const [error, setError] = useState(initError);

  const handleSubmit = () => {
    if (!error.password && !error.confirmPassword && input.password && input.confirmPassword) {
      userUpdatePassword.run({ password: input.passOld, new_password: input.password });
      setShow({ ...show, isLoading: true });
      setTimeout(() => {
        setShow({ ...show, isLoading: false });
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const userUpdatePassword = useUpdatePassword({
    onSuccess: (resp) => {
      if (resp.status === 'success') {
        toast.success('bạn đã thay đổi mật khẩu thành công');
        router.push({ pathname: ROUTE_PATH.LIST_GROUP });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
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
          } else if (value === input.passOld) {
            stateObj[name] = 'Mật khẩu mới không được trùng với mật khẩu cũ';
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
          } else if (value === input.passOld) {
            stateObj[name] = 'Mật khẩu mới không được trùng với mật khẩu cũ';
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  };
  return (
    <div>
      <ActionHead title='Đặt lại mật khẩu người dùng'></ActionHead>
      <div style={{ margin: '20px 100px' }}>
        <TextStyles font='font-regular-20'>Bạn có thể đặt lại mật khẩu tại đây</TextStyles>
      </div>
      <ViewPassWord
        show={show}
        input={input}
        error={error}
        setShow={setShow}
        onInputChange={onInputChange}
        handleKeyPress={handleKeyPress}
        validateInput={validateInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default UserUpdatePassword;
