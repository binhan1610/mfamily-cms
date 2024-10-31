import React from 'react';
import style from './InputSearch.module.scss';

export interface InputSearchProps {
  placeholder: string;
  handleChangeInput: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  suffix?: JSX.Element;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

function InputSearch(props: InputSearchProps) {
  const { placeholder, handleChangeInput, id, suffix, handleKeyPress } = props;
  return (
    <div className={style.Search}>
      <input
        id={id}
        className={style.InputSearch}
        type='text'
        placeholder={placeholder}
        onChange={handleChangeInput}
        autoComplete='off'
        onKeyDown={handleKeyPress}
      />

      {!!suffix && <div className={style.suffix}>{suffix}</div>}
    </div>
  );
}

export default InputSearch;
