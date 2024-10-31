import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

interface DatePickerProps {
  onChange?: any;
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  maxDate?: Date;
  isMonth?: boolean;
  isRequired?: boolean;
  type?: string;
  handleCancelDate?: (type: string) => void;
  close?: boolean;
  minDate?: Date;
  onChange2?: any;
  value2?: string;
  placeholder2?: string;
  margin: string;
  width: string;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

const RCDatePicker = (props: DatePickerProps) => {
  const {
    onChange,
    onChange2,
    value,
    label,
    placeholder,
    placeholder2,
    disabled,
    maxDate,
    minDate,
    isMonth,
    isRequired,
    type,
    value2,
    close = false,
    handleCancelDate,
    margin,
    width,
    handleKeyPress,
  } = props;
  const date = value ? new Date(value) : null;
  const date2 = value2 ? new Date(value2) : null;
  return (
    <div className={styles.datePicker}>
      {label && (
        <p>
          <p style={{ width: width, margin: margin, textAlign: 'right' }}>
            {' '}
            {label} {isRequired && <span className={styles.requiredInput}>*</span>}
          </p>
        </p>
      )}
      <DatePicker
        onKeyDown={handleKeyPress}
        onChange={onChange}
        selected={date}
        dateFormat={isMonth ? 'MM/yyyy HH:mm' : 'dd/MM/yyyy HH:mm'}
        className={onChange2 ? styles.inputDate : styles.inputDate2}
        placeholderText={placeholder}
        disabled={disabled}
        scrollableYearDropdown
        showMonthYearPicker={isMonth}
        showYearDropdown
        yearDropdownItemNumber={100}
        maxDate={maxDate}
        minDate={minDate}
        showTimeSelect
        timeIntervals={60}
        timeFormat='HH:mm'
      />
      {onChange2 && <div style={{ fontSize: '30px', margin: '0px 4px' }}>-</div>}
      {onChange2 && (
        <div>
          <DatePicker
            onKeyDown={handleKeyPress}
            onChange={onChange2}
            selected={date2}
            dateFormat={isMonth ? 'MM/yyyy HH:mm' : 'dd/MM/yyyy HH:mm'}
            className={styles.inputDate}
            placeholderText={placeholder2}
            disabled={disabled}
            scrollableYearDropdown
            showMonthYearPicker={isMonth}
            showYearDropdown
            yearDropdownItemNumber={100}
            maxDate={maxDate}
            minDate={minDate}
            showTimeSelect={true}
            timeIntervals={60}
            timeFormat='HH:mm'
          />
        </div>
      )}
      <div className={styles.icon}>
        <img src='/static/icons/icon-date-black.svg' width={18} height={20} alt='' />
      </div>
      {value && close && (
        <div
          className={styles.closeDate}
          onClick={() => type && handleCancelDate && handleCancelDate(type)}
        >
          <img src='/static/icons/icon_close.svg' width={10} height={10} alt='icon-close' />
        </div>
      )}
    </div>
  );
};
export default RCDatePicker;
