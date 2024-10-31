import style from './search-table.module.scss';
interface IProps {
  children: JSX.Element;
  logTable?: any;
}

function SearchTable(props: IProps) {
  const { children, logTable } = props;

  return (
    <div className={style.searchTable} style={logTable && { paddingBottom: '100px' }}>
      {children}
    </div>
  );
}

export default SearchTable;
