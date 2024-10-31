import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const EditRole = dynamic(() => import('@layout/Setting/EditRole'));

const EditRolePage = () => {
  return (
    <MainLayout>
      <EditRole />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default EditRolePage;
