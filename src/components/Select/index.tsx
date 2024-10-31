import React from 'react';
import style from './select.module.scss';

interface SelectProps {
  data: any;
  label: string;
  placeholder?: string;
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, title: string) => void;
  isRequired?: boolean;
  value?: number | string;
  disabled?: boolean;
  right?: string;
  width?: string;
}

interface ItemListProp {
  id: number | string;
  name: string;
}

function Select(props: SelectProps) {
  // const { t } = useTranslation('common');
  const {
    data,
    label,
    placeholder,
    // placeholder = `${t('common:select')} ...`,
    title,
    onChange,
    isRequired,
    value,
    disabled,
    right,
    width,
  } = props;

  return (
    <div className={style.selectWrapper}>
      <label className={style.labelInput}>
        {label} {isRequired ? <span className={style.requiredInput}>*</span> : null}
      </label>
      <select
        onChange={(e) => onChange?.(e, title)}
        id={title}
        value={value || ''}
        disabled={disabled}
        style={width ? { width: width } : undefined}
      >
        {placeholder && (
          <option value='' className={style.selectItem}>
            {placeholder}
          </option>
        )}

        {data?.map((item: ItemListProp) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className={style.iconSelect} style={right ? { right: right } : undefined}>
        <img src='/static/images/icon_down.png' width={12} height={8} alt='icon_down' />
      </div>
    </div>
  );
}

export default Select;
