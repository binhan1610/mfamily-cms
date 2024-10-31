import React from 'react';
import TextStyle from '@components/TextStyle';
import { CheckShowPass, ErrInput, InputProp } from '@utils/type';

import style from './index.module.scss';
import { HidePass, ShowPass } from '@components/Icons';
import Button from '@components/Button';

interface ViewPassWordProps {
  show: CheckShowPass;
  input: InputProp;
  error: ErrInput;
  loading?: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLElement>) => void;
  setShow: (value: CheckShowPass) => void;
  validateInput: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  handleSubmit: () => void;
  changeScreen: () => void;
}

function ViewPassWord(props: ViewPassWordProps) {
  const {
    show,
    input,
    error,
    loading,
    onInputChange,
    handleKeyPress,
    setShow,
    validateInput,
    handleSubmit,
    changeScreen,
  } = props;

  return (
    <>
      <div className={style.formTitle}>
        <div style={{ marginRight: '20px' }}>
          <TextStyle font='font-regular-12'>Mật khẩu</TextStyle>
        </div>

        <div className={style.formLogin}>
          <input
            className={style.formInput}
            type={show.isShowPass ? 'text' : 'password'}
            onBlur={validateInput}
            onChange={onInputChange}
            value={input.password}
            name='password'
            placeholder='Nhập mật khẩu'
            onKeyDown={handleKeyPress}
          />
          {error.password && (
            <div className={style.formError}>
              <TextStyle font='font-regular-12'>{error.password}</TextStyle>
            </div>
          )}

          <div className={style.formIcon}>
            <img src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
          </div>
          <div
            className={style.formIconHidePass}
            onClick={() => setShow({ ...show, isShowPass: !show.isShowPass })}
          >
            {show.isShowPass ? <ShowPass /> : <HidePass />}
          </div>
        </div>
      </div>
      <div className={style.formTitle}>
        <div style={{ marginRight: '20px' }}>
          <TextStyle font='font-regular-12'>Nhập lại mật khẩu</TextStyle>
        </div>
        <div className={style.formLogin}>
          <input
            className={style.formInput}
            onChange={onInputChange}
            type={show.isShowPassConfirm ? 'text' : 'password'}
            onBlur={validateInput}
            value={input.confirmPassword}
            name='confirmPassword'
            placeholder='Xác nhận mật khẩu'
            onKeyDown={handleKeyPress}
          />
          {error.confirmPassword && (
            <div className={style.formError}>
              <TextStyle font='font-regular-12'>{error.confirmPassword}</TextStyle>
            </div>
          )}

          <div className={style.formIcon}>
            <img src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
          </div>
          <div
            className={style.formIconHidePass}
            onClick={() => setShow({ ...show, isShowPassConfirm: !show.isShowPassConfirm })}
          >
            {show.isShowPassConfirm ? <ShowPass /> : <HidePass />}
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          isLoading={loading}
          text='Lưu'
          handleSubmit={handleSubmit}
          isDisabled={
            loading ||
            (!error.password && !error.confirmPassword && input.password && input.confirmPassword)
              ? false
              : true
          }
        />
        <Button isCancel text='Quay lại' handleSubmit={changeScreen} />
      </div>
    </>
  );
}

export default ViewPassWord;
