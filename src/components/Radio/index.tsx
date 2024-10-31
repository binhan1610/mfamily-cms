import React from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface RadioProps {
  className?: string;
  label?: string;
  disabled?: boolean;
  value?: string | number | null;
  name?: string;
  onChange?: Function;
  option?: {
    label?: string;
    value?: string | number;
  };
  icon?: JSX.Element;
  id?: any;
}
const Radio = (props: RadioProps, ref: any) => {
  const { className, disabled = false, value, option, onChange, id, icon } = props;
  const radioRef = (ref as any) || React.createRef<HTMLInputElement>();

  const isActive = option?.value === value;

  const onClick = () => {
    if (!disabled) {
      onChange && onChange(option?.value);
    }
  };

  return (
    <div className={styles.radioItem}>
      <div
        onClick={onClick}
        ref={radioRef}
        className={cls(styles.radioBtn, isActive && styles.radioBtnActive, className)}
        id={id}
      >
        {option?.label && (
          <label htmlFor={`${option.value}`}>
            <div className={icon ? styles.wrapperLabelIcon : styles.wrapperLabel}>
              {icon && <div className={styles.icon}>{icon}</div>}
              <div>{option.label}</div>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};
const RadioForward = React.forwardRef(Radio);

export default RadioForward;
