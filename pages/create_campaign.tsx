import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const CreateCampaign = dynamic(() => import('@layout/Marketing/CreateCampaign'), {
  ssr: false,
});

const CreateCampaignPage = () => {
  return (
    <MainLayout>
      <CreateCampaign />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default CreateCampaignPage;
