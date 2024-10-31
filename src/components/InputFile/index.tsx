import React from 'react';
import style from './index.module.scss';

interface InputFileProps {
  label: string;
  onChange?: (file: File | null) => void; // Sự kiện onChange nhận vào một tập tin hoặc null
  layout?: string;
  fileName?: string;
  description?: string;
  onClick?: () => void;
}

function InputFile(props: InputFileProps) {
  const { label, onChange, layout, fileName, description, onClick } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    onChange?.(selectedFile);
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };
  return (
    <>
      <div className={style.inputFile}>
        <label className={style.label}>{label}</label>
        <div className={style.fileInput}>
          <label htmlFor='files'>
            {fileName ? (
              <p className={style.btn}>{fileName}</p>
            ) : (
              <p className={style.btn}>Chọn file </p>
            )}
          </label>
          <input
            id='files'
            style={{ visibility: 'hidden' }}
            type='file'
            onChange={handleFileChange} // Gọi hàm handleFileChange khi có sự kiện onChange từ input file
          />
        </div>
        {fileName ? (
          ''
        ) : (
          <div className={style.description}>
            <div>{description}</div>
            <div onClick={handleClick} style={{ textAlign: 'center' }}>
              (
              <a href='' style={{ color: '#5595FF', textDecoration: 'underline' }}>
                Tải file mẫu
              </a>
              )
            </div>
          </div>
        )}
      </div>
      <div className={style.layout}>{layout}</div>
    </>
  );
}

export default InputFile;
