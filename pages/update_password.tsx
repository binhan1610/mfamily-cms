import MainLayout from '@layout/MainLayout';
import dynamic from 'next/dynamic';
const UserUpdatePassword = dynamic(() => import('@layout/UserUpdatePassword'), { ssr: false });

const UserUpdatePasswordPage = () => {
  return (
    <MainLayout>
      <UserUpdatePassword />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default UserUpdatePasswordPage;
