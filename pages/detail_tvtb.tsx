import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const DetailUser = dynamic(() => import('@layout/GroupLeader/detail'));

const DetailUserPage = () => {
  return (
    <MainLayout>
      <DetailUser />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default DetailUserPage;
