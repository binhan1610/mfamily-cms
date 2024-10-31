import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const Setting = dynamic(() => import('@layout/Setting'));

const SettingPage = () => {
  return (
    <MainLayout>
      <Setting />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default SettingPage;
