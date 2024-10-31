import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import MainLayout from 'src/layout/MainLayout';
const Home = dynamic(() => import('@layout/Setting'), { ssr: false });

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default HomePage;
