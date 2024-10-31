import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ReportUser = dynamic(() => import('@layout/Marketing/ReportUser'), {
  ssr: false,
});

const ReportUserPage = () => {
  return (
    <MainLayout>
      <ReportUser />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ReportUserPage;
