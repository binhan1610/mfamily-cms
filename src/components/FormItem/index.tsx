import { Field } from 'rc-field-form';
import React from 'react';
import styles from './styles.module.scss';
import cls from 'classnames';

interface FormItemProps {
  children: any;
  name?: string | number;
  hideError?: boolean;
  [k: string]: any;
  className?: string;
}

const FormItem = ({ children, className, ...props }: FormItemProps) => {
  return (
    <Field {...props}>
      {({ onChange, value, ...rest }, meta, context) => {
        const { errors } = meta;

        const hasError: string = errors && errors[0];
        if (typeof children === 'function') {
          return (
            <div className={`${styles.formItemContainer} ${className ? className : ''}`}>
              <div>{children({ onChange, value, meta, hasError, ...rest }, context)}</div>
              {(
                children.props?.value === '' || !children.props?.value
                  ? hasError
                  : children.props?.value === ''
              ) ? (
                <p className={cls('btn-radio', styles.err)}>{hasError}</p>
              ) : null}
            </div>
          );
        }

        return (
          <div className={cls([styles.formItemContainer, className])}>
            <div>
              {React.cloneElement(children, {
                onChange,
                value,
                ...rest,
                ...children.props,
              })}
            </div>

            {(
              children.props?.value === '' || !children.props?.value
                ? hasError
                : children.props?.value === ''
            ) ? (
              <p className={cls('btn-radio', styles.err)}>{hasError}</p>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
