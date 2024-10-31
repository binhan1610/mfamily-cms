import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const DetailUserInLog = dynamic(() => import('@layout/GroupLeader/detailUserInLog'));

const DetailUserInLogPage = () => {
  return (
    <MainLayout>
      <DetailUserInLog />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default DetailUserInLogPage;
