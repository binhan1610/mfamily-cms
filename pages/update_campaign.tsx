import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const UpdateCampaign = dynamic(() => import('@layout/Marketing/UpdateCampaign'), {
  ssr: false,
});

const UpdateCampaignPage = () => {
  return (
    <MainLayout>
      <UpdateCampaign />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default UpdateCampaignPage;
