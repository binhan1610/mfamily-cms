import React from 'react';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import LoadingTable from '@components/LoadingTable';

interface RowTB {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  render?: (index: number, record: any) => JSX.Element;
}

export interface ITable {
  columns: RowTB[];
  data: any[];
  loading?: boolean;
  currentPage: number;
  totalPage: number;
  handlePagination?: (page: number) => void;
  pageSize?: number;
  handleCheckItem?: (value: any) => void;
  checkedList?: number[];
  handleDetailItem?: (id: string) => void;
}
const CustomTable = (props: ITable): JSX.Element => {
  const {
    columns,
    data,
    loading,
    currentPage,
    totalPage,
    pageSize,
    checkedList,
    handlePagination,
    handleCheckItem,
    handleDetailItem,
  } = props;
  return (
    <div className={styles.tableContainer}>
      {loading && (
        <div className={styles.loading}>
          <LoadingTable />
        </div>
      )}
      <table className={styles.transTable}>
        <colgroup>
          {columns.map((item, index) => (
            <col span={1} key={index} />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.tableHeader}>
            {columns.map((item) => (
              <th
                key={item.key}
                style={{
                  minWidth: item.width || 'auto',
                }}
              >
                <b
                  className='font-bold-14'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  {item.title}
                </b>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!!data
            ? data?.map((item: any, index: number) => {
                return (
                  <tr className={styles.tableRow} key={index}>
                    {columns.map((el) => {
                      if (el.key === 'stt') {
                        return (
                          <td key={el.key} className={styles.sttTable}>
                            {index + 1 + currentPage * Number(pageSize) - Number(pageSize)}
                          </td>
                        );
                      }

                      if (el.key === 'check') {
                        return (
                          <td key={el.key} className={styles.checkboxTable}>
                            <input
                              type='checkbox'
                              onChange={() => handleCheckItem?.(item)}
                              checked={checkedList?.includes(item.id)}
                            />
                          </td>
                        );
                      }
                      if (el.render) {
                        return (
                          <td
                            key={el.key}
                            onClick={() =>
                              handleDetailItem && el.key !== 'action' && handleDetailItem(item.id)
                            }
                          >
                            {el.render(index, item)}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={el.key}
                          onClick={() => handleDetailItem && handleDetailItem(item.id)}
                        >
                          {item[el.dataIndex]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      {handlePagination && (
        <>
          {data?.length === 0 || !data ? (
            <div className={styles.notData}>
              <div>Vui lòng tìm kiếm dữ liệu</div>
            </div>
          ) : (
            <Pagination
              page={currentPage}
              handlePagination={handlePagination}
              totalPages={totalPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomTable;
