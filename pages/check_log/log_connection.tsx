import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const LogConnection = dynamic(() => import('@layout/GroupLeader/CheckLog/LogConnection'), {
  ssr: false,
});

const LogConnectionPage = () => {
  return (
    <MainLayout>
      <LogConnection />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LogConnectionPage;
