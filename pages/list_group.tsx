import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const ListGroup = dynamic(() => import('@layout/GroupLeader/ListGroup'));

const ListGroupPage = () => {
  return (
    <MainLayout>
      <ListGroup />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ListGroupPage;
