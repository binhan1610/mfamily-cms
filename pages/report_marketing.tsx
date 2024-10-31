import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ReportMarketing = dynamic(() => import('@layout/Marketing/ReportCampaign'), {
  ssr: false,
});

const ReportMarketingPage = () => {
  return (
    <MainLayout>
      <ReportMarketing />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ReportMarketingPage;
