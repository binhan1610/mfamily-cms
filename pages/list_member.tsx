import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ListMember = dynamic(() => import('@layout/GroupLeader/ListMember'));

const ListMemberPage = () => {
  return (
    <MainLayout>
      <ListMember />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ListMemberPage;
