import React from 'react';
import style from './InputTextarea.module.scss';

interface InputTextareaProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  isRequired?: boolean;
  maxlength?: number;
}

const InputTextarea = (props: InputTextareaProps, ref: any) => {
  const textareaRef = (ref as any) || React.createRef<HTMLInputElement>();
  const { label, value, disabled, placeholder, rows = 5, isRequired, maxlength, ...res } = props;

  return (
    <div style={{ display: 'flex' }}>
      <p className={style.labelTextarea}>
        {label} {isRequired ? <span className={style.requiredInput}>*</span> : null}
      </p>
      <textarea
        ref={textareaRef}
        rows={rows}
        cols={60}
        className={style.inputTextarea}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        maxLength={maxlength}
        {...res}
      ></textarea>
    </div>
  );
};

const TextareaForward = React.forwardRef(InputTextarea);

export default TextareaForward;
