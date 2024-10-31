import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useToggle } from 'ahooks';
import styles from './index.module.scss';
import Loading from '@components/Loading';

interface InputProps {
  className?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'number' | 'hidden' | 'date' | 'email';
  placeholder?: string;
  onClick?: () => void;
  onFocus?: () => void;
  label?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  available?: string;
  onKeyPress?: (e: any) => void;
  step?: any;
  isRequired?: boolean;
  defaultValue?: string;
  loading?: boolean;
  description?: string;
}

const Input = (props: InputProps, ref: any) => {
  const {
    className,
    disabled = false,
    type,
    placeholder,
    label = '',
    onClick,
    onFocus,
    maxLength,
    defaultValue,
    value,
    suffix,
    prefix,
    step,
    available,
    isRequired,
    loading,
    description,
    ...rest
  } = props;
  let val = value === null || undefined ? '' : value;
  const inputRef = (ref as any) || React.createRef<HTMLInputElement>();

  const [state] = useToggle();

  const isTypePassword: boolean = type === 'password';

  const prefixCls: string = 'input';

  const classes: string = classNames(
    prefixCls,
    styles.InputSearch,
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick && onClick();
  };

  const handleBlur = () => {
    if (type === 'number') {
      const inputValue: number = inputRef?.current?.value;

      const minNumber: number = (rest as any)?.min;
      const maxNumber: number = (rest as any)?.max;

      if (minNumber && minNumber > inputValue) {
        // Set number value to min if value less than min number
        inputRef.current.value = minNumber;
      }

      if (maxNumber && maxNumber < inputValue) {
        // Set number value to max if value greater than max number
        inputRef.current.value = maxNumber;
      }
    }
  };

  const implicitType = (): InputProps['type'] => {
    if (isTypePassword) {
      if (state) {
        return 'text';
      }

      return 'password';
    }

    return type;
  };

  const blockInvalidCharNumber: string[] = ['e', 'E', '+', '-'];

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (type === 'number') {
      const isBlockChar: boolean = blockInvalidCharNumber.includes(event.key);

      if (isBlockChar) {
        return event.preventDefault();
      }
    }
  };

  useEffect(() => {
    inputRef.current.addEventListener('mousewheel', function (event: any) {
      event.preventDefault();
    });
  }, [inputRef]);

  return (
    <div
      className={classNames('wrapper-input', styles.inputWrapper)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {label && type !== 'hidden' && (
        <p className={styles.labelInput}>
          {label} {isRequired ? <span className={styles.requiredInput}>*</span> : null}
        </p>
      )}

      <input
        ref={inputRef}
        type={implicitType()}
        disabled={disabled}
        className={classes}
        placeholder={placeholder}
        onClick={handleClick}
        onBlur={handleBlur}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        step={step ?? 'any'}
        onFocus={onFocus}
        defaultValue={defaultValue}
        value={val}
        {...rest}
        style={{ paddingLeft: prefix ? '70px' : available ? '75px' : '20px' }}
      />
      {loading && (
        <div className={styles.loadingInput}>
          <Loading />
        </div>
      )}
      {available && <div className={styles.available}>{available}</div>}
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      {suffix && <div className={styles.suffix}>{suffix}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};
const InputForward = React.forwardRef(Input);

export default InputForward;
