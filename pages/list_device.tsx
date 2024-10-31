import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ListDevice = dynamic(() => import('@layout/GroupLeader/ListDevice'));

const ListDevicePage = () => {
  return (
    <MainLayout>
      <ListDevice />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ListDevicePage;
