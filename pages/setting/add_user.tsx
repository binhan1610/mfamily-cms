import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const AddUser = dynamic(() => import('@layout/Setting/AddUser'));

const AddUserPage = () => {
  return (
    <MainLayout>
      <AddUser />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default AddUserPage;
