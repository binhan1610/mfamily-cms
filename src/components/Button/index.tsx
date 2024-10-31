import React from 'react';
import style from './button.module.scss';
import Loading from '../Loading';
interface ButtonProps {
  type?: any;
  text?: string;
  handleSubmit?: React.MouseEventHandler<HTMLElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
  isCancel?: boolean;
  id?: string;
  customStyle?: React.CSSProperties;
  prefix?: JSX.Element;
  bgColor?: string;
  color?: string;
  htmlType?: string;
  top?: string;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLElement>) => void;
  padding?: string;
}

function Button(props: ButtonProps) {
  const {
    text,
    handleSubmit,
    isLoading,
    isDisabled,
    isCancel,
    type,
    id,
    customStyle,
    prefix,
    bgColor,
    color,
    top,
    handleKeyPress,
    padding,
  } = props;
  return (
    <button
      onClick={handleSubmit}
      className={isCancel ? style.cancel : style.submit}
      disabled={isDisabled || isLoading}
      style={{
        opacity: isDisabled ? 0.5 : 1,
        ...customStyle,
        background: isDisabled ? 'var(--Backgroud-1, #F5F5F5)' : bgColor,
        color: isDisabled ? 'black' : color,
        top: top ? top : undefined,
        padding: padding ? padding : '10px 25px',
      }}
      type={type}
      id={id}
      onKeyDown={handleKeyPress}
    >
      {prefix && <div className={style.prefix}>{prefix}</div>}
      <div style={{ fontSize: '14px' }}>{text}</div>
      {isLoading && (
        <div className={style.loadingSpan}>
          <Loading />
        </div>
      )}
    </button>
  );
}

export default Button;
