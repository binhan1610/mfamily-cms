import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const CheckLog = dynamic(() => import('@layout/GroupLeader/CheckLog'), { ssr: false });

const CheckLogPage = () => {
  return (
    <MainLayout>
      <CheckLog />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default CheckLogPage;
