import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const Profile = dynamic(() => import('@layout/Profile'));

const ProfilePage = () => {
  return (
    <MainLayout>
      <Profile />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ProfilePage;
