import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const LogLogin = dynamic(() => import('@layout/GroupLeader/CheckLog/LogLogin'), { ssr: false });

const LogLoginPage = () => {
  return (
    <MainLayout>
      <LogLogin />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LogLoginPage;
