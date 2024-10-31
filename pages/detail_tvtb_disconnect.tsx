import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const DetailUserDisconnect = dynamic(() => import('@layout/GroupLeader/detailUserDisconnect'));

const DetailUserDisconnectPage = () => {
  return (
    <MainLayout>
      <DetailUserDisconnect />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default DetailUserDisconnectPage;
