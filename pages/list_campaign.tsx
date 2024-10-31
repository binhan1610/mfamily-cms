import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ListCampaign = dynamic(() => import('@layout/Marketing/ListCampaign'), {
  ssr: false,
});

const ListCampaignPage = () => {
  return (
    <MainLayout>
      <ListCampaign />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ListCampaignPage;
