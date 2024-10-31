import React from 'react';
import classNames from 'classnames';
import styles from './pagination.module.scss';
export interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}
const Pagination: React.FC<Props> = ({ page, totalPages, handlePagination }) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationWrapper}>
        {
          <button
            onClick={() => {
              if (page !== 1) {
                handlePagination(page - 1);
              }
            }}
            type='button'
            className={classNames([styles.pageItem, styles.sides].join(' '))}
          >
            <img src='/static/icons/arrow-left-sm.svg' width={14} height={14} alt='icon_down' />
          </button>
        }
        <button
          onClick={() => {
            if (totalPages !== 1) handlePagination(1);
          }}
          type='button'
          className={classNames(styles.pageItem, {
            [styles.active]: page === 1,
          })}
        >
          {1}
        </button>
        {page > 3 && <div className={styles.separator}>...</div>}
        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type='button'
            className={styles.pageItem}
          >
            {page - 2}
          </button>
        )}
        {page > 2 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type='button'
            className={styles.pageItem}
          >
            {page - 1}
          </button>
        )}
        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type='button'
            className={[styles.pageItem, styles.active].join(' ')}
          >
            {page}
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type='button'
            className={styles.pageItem}
          >
            {page + 1}
          </button>
        )}
        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type='button'
            className={styles.pageItem}
          >
            {page + 2}
          </button>
        )}
        {page < totalPages - 2 && <div className={styles.separator}>...</div>}
        {totalPages > 1 && (
          <button
            onClick={() => handlePagination(totalPages)}
            type='button'
            className={classNames(styles.pageItem, {
              [styles.active]: page === totalPages,
            })}
          >
            {totalPages}
          </button>
        )}
        <button
          onClick={() => {
            if (page !== totalPages) {
              handlePagination(page + 1);
            }
          }}
          type='button'
          className={[styles.pageItem, styles.sides].join(' ')}
        >
          <img src='/static/icons/arrow-right-sm.svg' width={20} height={20} alt='icon_down' />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
