import dynamic from 'next/dynamic';
import style from './main.module.scss';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});

// const Footer = dynamic(() => import('../components/Footer'), {
//   ssr: false,
// });

const MainLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />
      <main className={style.mainLayout}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
