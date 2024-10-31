import React from 'react';
import TextStyle from '@components/TextStyle';
import { CheckShowPass, ErrInput, InputProp } from '@utils/type';

import style from './index.module.scss';
import Button from '@components/Button';

interface ViewPassWordProps {
  show: CheckShowPass;
  input: InputProp;
  error: ErrInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLElement>) => void;
  setShow: (value: CheckShowPass) => void;
  validateInput: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  handleSubmit: () => void;
  changeScreen?: () => void;
  loading?: boolean;
}

function ViewPassWord(props: ViewPassWordProps) {
  const {
    show,
    input,
    error,
    loading = false,
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
        <div className={style.textInput}>
          <TextStyle font='font-regular-18'>Nhập mật khẩu hiện tại:</TextStyle>
        </div>

        <div className={style.formLogin}>
          <input
            className={style.formInput}
            type={show.isShowPass ? 'text' : 'password'}
            onBlur={validateInput}
            onChange={onInputChange}
            value={input.passOld}
            name='passOld'
            placeholder='Nhập mật khẩu'
            onKeyDown={handleKeyPress}
          />

          <div className={style.formIcon}>
            <img src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
          </div>
          <div
            className={style.formIconHidePass}
            onClick={() => setShow({ ...show, isShowPass: !show.isShowPass })}
          >
            <img
              src={!show.isShowPass ? '/static/icons/hide-eye.svg' : '/static/icons/open-eye.svg'}
              width={20}
              height={20}
              alt='pass-word'
            />
          </div>
        </div>
      </div>
      <div className={style.formTitle}>
        <div className={style.textInput}>
          <TextStyle font='font-regular-18'>Nhập mật khẩu mới:</TextStyle>
        </div>

        <div className={style.formLogin}>
          <input
            className={style.formInput}
            onChange={onInputChange}
            type={show.isShowPassNew ? 'text' : 'password'}
            onBlur={validateInput}
            value={input.password}
            name='password'
            placeholder='Xác nhận mật khẩu'
            onKeyDown={handleKeyPress}
          />
          {error.password && (
            <div className={style.formError}>
              <TextStyle font='font-regular-16'>{error.password}</TextStyle>
            </div>
          )}

          <div className={style.formIcon}>
            <img src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
          </div>
          <div
            className={style.formIconHidePass}
            onClick={() => setShow({ ...show, isShowPassNew: !show.isShowPassNew })}
          >
            <img
              src={
                !show.isShowPassNew ? '/static/icons/hide-eye.svg' : '/static/icons/open-eye.svg'
              }
              width={20}
              height={20}
              alt='pass-word'
            />
          </div>
        </div>
      </div>
      <div className={style.formTitle}>
        <div className={style.textInput}>
          <TextStyle font='font-regular-18'>Nhập lại mật khẩu:</TextStyle>
        </div>

        <div className={style.formLogin}>
          <input
            className={style.formInput}
            onChange={onInputChange}
            type={show.isShowPassConfirm ? 'text' : 'password'}
            onBlur={validateInput}
            value={input.confirmPassword}
            name='confirmPassword'
            placeholder='Xác nhận mật khẩu mới'
            onKeyDown={handleKeyPress}
          />
          {error.confirmPassword && (
            <div className={style.formError}>
              <TextStyle font='font-regular-16'>{error.confirmPassword}</TextStyle>
            </div>
          )}

          <div className={style.formIcon}>
            <img src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
          </div>
          <div
            className={style.formIconHidePass}
            onClick={() => setShow({ ...show, isShowPassConfirm: !show.isShowPassConfirm })}
          >
            <img
              src={
                !show.isShowPassConfirm
                  ? '/static/icons/hide-eye.svg'
                  : '/static/icons/open-eye.svg'
              }
              width={20}
              height={20}
              alt='pass-word'
            />
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          isLoading={show.isLoading}
          text='Lưu'
          handleSubmit={handleSubmit}
          isDisabled={
            error.password ||
            error.confirmPassword ||
            !input.passOld ||
            !input.password ||
            !input.confirmPassword ||
            loading
              ? true
              : false
          }
        />
        <Button isCancel text='Quay lại' handleSubmit={changeScreen} />
      </div>
    </>
  );
}

export default ViewPassWord;
