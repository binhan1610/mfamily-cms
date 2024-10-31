import { useCloseSpaceEsc } from '@hooks/useCloseSpaceEsc';
import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import style from './modal.module.scss';
import Button from '@components/Button';

interface IRef {
  toggleModal: () => void;
}

interface IProps {
  children: JSX.Element;
  widthModal?: number;
  handleSubmit?: () => void;
  isClose?: boolean;
}

const Modal: React.ForwardRefRenderFunction<IRef, IProps> = (props, ref): JSX.Element => {
  const { children, widthModal, isClose = false, handleSubmit } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => {
    return {
      toggleModal: () => setIsOpen(!isOpen),
      isOpen,
    };
  });

  const handleCancelPopup = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useCloseSpaceEsc(handleCancelPopup);
  if (!isOpen) return <></>;
  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContent} style={{ width: widthModal }}>
        <div className={style.closeOTP} onClick={handleCancelPopup}>
          <img src='/static/icons/icon_close.svg' width={16} height={16} alt='icon-close' />
        </div>
        {children}
        <div className={style.buttonModal}>
          {isClose ? (
            <Button text='Đóng' handleSubmit={handleCancelPopup} />
          ) : (
            <>
              <Button text='Có' handleSubmit={handleSubmit} padding='10px 33px' />
              <Button text='Không' isCancel handleSubmit={handleCancelPopup} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Modal);
