import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const MonitorSystem = dynamic(() => import('@layout/Home'));

const MonitorSystemPage = () => {
  return (
    <MainLayout>
      <MonitorSystem />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default MonitorSystemPage;
