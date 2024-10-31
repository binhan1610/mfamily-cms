import React from 'react';
interface TextProps {
  font:
    | 'font-bold-72'
    | 'font-bold-36'
    | 'font-bold-28'
    | 'font-bold-24'
    | 'font-bold-20'
    | 'font-bold-18'
    | 'font-bold-16'
    | 'font-bold-14'
    | 'font-bold-12'
    | 'font-bold-10'
    | 'font-regular-36'
    | 'font-regular-28'
    | 'font-regular-24'
    | 'font-regular-20'
    | 'font-regular-18'
    | 'font-regular-16'
    | 'font-regular-14'
    | 'font-regular-12'
    | 'font-regular-10'
    | 'font-medium-32'
    | 'font-medium-18'
    | 'font-medium-16'
    | 'font-medium-14'
    | 'font-medium-12'
    | 'font-italic-12';
  children: React.ReactNode;
  onClick?: () => void;
}

function TextStyles(props: TextProps & { children: React.ReactNode }) {
  const { font, children, onClick } = props;
  return (
    <div className={font} onClick={onClick}>
      {children}
    </div>
  );
}

export default TextStyles;
