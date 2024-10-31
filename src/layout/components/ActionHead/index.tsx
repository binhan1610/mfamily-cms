import style from './index.module.scss';

interface IProps {
  title: string;
  children?: JSX.Element;
}

function ActionHead(props: IProps) {
  const { title, children } = props;
  return (
    <>
      <div className={style.headerTable}>
        <div className={style.titleTable}>{title}</div>
        {children}
      </div>
      <div className={style.lineTable}></div>
    </>
  );
}

export default ActionHead;
