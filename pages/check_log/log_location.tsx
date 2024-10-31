import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const LogLocation = dynamic(() => import('@layout/GroupLeader/CheckLog/LogLocation'), {
  ssr: false,
});

const LogLocationPage = () => {
  return (
    <MainLayout>
      <LogLocation />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LogLocationPage;
