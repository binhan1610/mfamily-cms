import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const Detail = dynamic(() => import('@layout/Setting/Detail'));

const DetailPage = () => {
  return (
    <MainLayout>
      <Detail />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default DetailPage;
