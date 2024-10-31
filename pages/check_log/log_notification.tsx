import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const LogNotification = dynamic(() => import('@layout/GroupLeader/CheckLog/LogNotification'), {
  ssr: false,
});

const LogNotificationPage = () => {
  return (
    <MainLayout>
      <LogNotification />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LogNotificationPage;
